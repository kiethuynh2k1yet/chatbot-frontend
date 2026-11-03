"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Conversation } from "@/types/conversation";
import type { Message } from "@/types/message";
import type { Profile } from "@/types/profile";
import { useAuth } from "./useAuth";

export function useMessages(conversationId: string) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [participant, setParticipant] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    if (!user || !conversationId) return;
    const currentRequest = ++requestId.current;
    const supabase = getSupabaseClient();
    const { data: conversationRow, error: conversationError } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .maybeSingle();
    if (currentRequest !== requestId.current) return;
    if (conversationError || !conversationRow) {
      setError(
        conversationError
          ? `Không thể tải cuộc trò chuyện: ${conversationError.message}`
          : "Cuộc trò chuyện không tồn tại hoặc bạn không có quyền truy cập.",
      );
      setLoading(false);
      return;
    }
    setConversation(conversationRow);
    const participantId =
      conversationRow.user_a_id === user.id
        ? conversationRow.user_b_id
        : conversationRow.user_a_id;
    const [{ data: profile, error: profileError }, { data: messageRows, error: messagesError }] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", participantId).single(),
        supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true }),
      ]);
    if (currentRequest !== requestId.current) return;
    if (profileError || messagesError) {
      setError(
        `Không thể tải tin nhắn: ${profileError?.message ?? messagesError?.message}`,
      );
      setLoading(false);
      return;
    }
    setParticipant(profile);
    setMessages(messageRows ?? []);
    setError(null);
    setLoading(false);
  }, [conversationId, user]);

  useEffect(() => {
    if (!user || !conversationId) return;
    const refreshTimeout = window.setTimeout(() => {
      setLoading(true);
      setMessages([]);
      setConversation(null);
      setParticipant(null);
      void load();
    }, 0);
    const supabase = getSupabaseClient();
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const incoming = payload.new as Message;
          setMessages((current) =>
            current
              .concat(
                current.some((message) => message.id === incoming.id)
                  ? []
                  : [incoming],
              )
              .sort(
                (left, right) =>
                  new Date(left.created_at).getTime() -
                  new Date(right.created_at).getTime(),
              ),
          );
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setError("Mất kết nối thời gian thực. Hãy kiểm tra kết nối mạng.");
        }
      });
    return () => {
      window.clearTimeout(refreshTimeout);
      requestId.current += 1;
      void supabase.removeChannel(channel);
    };
  }, [conversationId, load, user]);

  const participantId = participant?.id;
  useEffect(() => {
    if (!participantId) return;
    const supabase = getSupabaseClient();
    const channel = supabase
      .channel(`chat-profile:${participantId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${participantId}`,
        },
        (payload) => setParticipant(payload.new as Profile),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [participantId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!user || !conversationId) throw new Error("Bạn cần đăng nhập để gửi tin nhắn.");
      const trimmedContent = content.trim();
      if (!trimmedContent) return;
      const { error: insertError } = await getSupabaseClient()
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: trimmedContent,
        });
      if (insertError) throw new Error(`Không thể gửi tin nhắn: ${insertError.message}`);
    },
    [conversationId, user],
  );

  return { messages, conversation, participant, loading, error, sendMessage, reload: load };
}
