"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { ConversationSummary } from "@/types/conversation";
import type { Profile } from "@/types/profile";
import type { Message } from "@/types/message";
import { useAuth } from "./useAuth";

export function useConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!user) {
      setConversations([]);
      setLoading(false);
      return;
    }
    setError(null);
    const supabase = getSupabaseClient();
    const { data: rows, error: conversationError } = await supabase
      .from("conversations")
      .select("*")
      .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
      .order("updated_at", { ascending: false });
    if (conversationError) {
      setError(`Không thể tải cuộc trò chuyện: ${conversationError.message}`);
      setLoading(false);
      return;
    }
    if (!rows.length) {
      setConversations([]);
      setLoading(false);
      return;
    }

    const ids = rows.map((row) => row.id);
    const partnerIds = rows.map((row) =>
      row.user_a_id === user.id ? row.user_b_id : row.user_a_id,
    );
    const [{ data: profiles, error: profileError }, { data: messages, error: messageError }] =
      await Promise.all([
        supabase.from("profiles").select("*").in("id", partnerIds),
        supabase
          .from("messages")
          .select("*")
          .in("conversation_id", ids)
          .order("created_at", { ascending: false }),
      ]);
    if (profileError || messageError) {
      setError(
        `Không thể tải danh sách: ${profileError?.message ?? messageError?.message}`,
      );
      setLoading(false);
      return;
    }

    const profileById = new Map<string, Profile>(
      (profiles ?? []).map((profile) => [profile.id, profile]),
    );
    const latestByConversation = new Map<string, Message>();
    for (const message of messages ?? []) {
      if (!latestByConversation.has(message.conversation_id)) {
        latestByConversation.set(message.conversation_id, message);
      }
    }
    setConversations(
      rows.flatMap((conversation) => {
        const participantId =
          conversation.user_a_id === user.id
            ? conversation.user_b_id
            : conversation.user_a_id;
        const participant = profileById.get(participantId);
        return participant
          ? [
              {
                conversation,
                participant,
                lastMessage: latestByConversation.get(conversation.id) ?? null,
              },
            ]
          : [];
      }),
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      await reload();
      if (!active) return;
    };
    void refresh();
    if (!user) return () => { active = false; };

    const supabase = getSupabaseClient();
    const channel = supabase
      .channel(`conversation-list:${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => void reload(),
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        () => void reload(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        () => void reload(),
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setError("Không thể kết nối cập nhật trực tiếp danh sách chat.");
        }
      });
    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [reload, user]);

  const searchUsers = useCallback(
    async (query: string): Promise<Profile[]> => {
      const term = query.trim();
      if (!user || !term) return [];
      const supabase = getSupabaseClient();
      const pattern = `%${term}%`;
      const [byName, byEmail] = await Promise.all([
        supabase.from("profiles").select("*").ilike("display_name", pattern).limit(20),
        supabase.from("profiles").select("*").ilike("email", pattern).limit(20),
      ]);
      if (byName.error || byEmail.error) {
        const searchError = byName.error ?? byEmail.error;
        throw new Error(
          `Không thể tìm người dùng: ${searchError?.message ?? "Vui lòng thử lại."}`,
        );
      }
      const results = new Map<string, Profile>();
      for (const profile of [...(byName.data ?? []), ...(byEmail.data ?? [])]) {
        if (profile.id !== user.id) results.set(profile.id, profile);
      }
      return [...results.values()];
    },
    [user],
  );

  const startConversation = useCallback(
    async (otherUserId: string): Promise<string> => {
      if (!user) throw new Error("Bạn cần đăng nhập để bắt đầu trò chuyện.");
      const { data, error: rpcError } = await getSupabaseClient().rpc(
        "create_or_get_conversation",
        { other_user_id: otherUserId },
      );
      if (rpcError) throw new Error(`Không thể bắt đầu trò chuyện: ${rpcError.message}`);
      const conversation = data[0];
      if (!conversation) throw new Error("Không thể tạo cuộc trò chuyện.");
      await reload();
      return conversation.id;
    },
    [reload, user],
  );

  return { conversations, loading, error, reload, searchUsers, startConversation };
}
