"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { TypingStatus } from "@/types/message";
import { useAuth } from "./useAuth";

export function useTypingStatus(conversationId: string) {
  const { user } = useAuth();
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [typingError, setTypingError] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const setTyping = useCallback(
    async (typing: boolean) => {
      if (!user || !conversationId) return;
      const supabase = getSupabaseClient();
      const payload = {
        conversation_id: conversationId,
        user_id: user.id,
        is_typing: typing,
      };
      const { error } = await supabase.from("typing_status").upsert(payload);
      if (error) throw new Error(`Không thể cập nhật trạng thái nhập: ${error.message}`);
      setTypingError(null);
    },
    [conversationId, user],
  );

  const notifyTyping = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    void setTyping(true).catch((error: unknown) => {
      setTypingError(
        error instanceof Error ? error.message : "Không thể cập nhật trạng thái nhập.",
      );
    });
    timer.current = window.setTimeout(() => {
      void setTyping(false).catch((error: unknown) => {
        setTypingError(
          error instanceof Error ? error.message : "Không thể cập nhật trạng thái nhập.",
        );
      });
      timer.current = null;
    }, 1800);
  }, [setTyping]);

  const stopTyping = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    void setTyping(false).catch((error: unknown) => {
      setTypingError(
        error instanceof Error ? error.message : "Không thể cập nhật trạng thái nhập.",
      );
    });
  }, [setTyping]);

  useEffect(() => {
    if (!user || !conversationId) return;
    const supabase = getSupabaseClient();
    const loadStatus = async () => {
      const { data, error } = await supabase
        .from("typing_status")
        .select("*")
        .eq("conversation_id", conversationId)
        .neq("user_id", user.id)
        .maybeSingle();
      if (error) {
        setTypingError(`Không thể tải trạng thái nhập: ${error.message}`);
        return;
      }
      const status = data as TypingStatus | null;
      setIsOtherTyping(
        Boolean(
          status?.is_typing &&
            Date.now() - new Date(status.updated_at).getTime() < 5000,
        ),
      );
    };
    void loadStatus();

    const channel = supabase
      .channel(`typing:${conversationId}:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "typing_status",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const status = (payload.new as TypingStatus | undefined) ?? null;
          if (!status || status.user_id === user.id) return;
          setIsOtherTyping(
            status.is_typing &&
              Date.now() - new Date(status.updated_at).getTime() < 5000,
          );
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setTypingError("Mất kết nối cập nhật trạng thái nhập.");
        }
      });
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      void supabase.removeChannel(channel);
      void supabase
        .from("typing_status")
        .delete()
        .eq("conversation_id", conversationId)
        .eq("user_id", user.id)
        .then(({ error }) => {
          if (error) console.error("Không thể xóa trạng thái đang nhập:", error.message);
        });
    };
  }, [conversationId, user]);

  return { isOtherTyping, notifyTyping, stopTyping, typingError };
}
