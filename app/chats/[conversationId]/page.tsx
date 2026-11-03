"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMessages } from "@/hooks/useMessages";
import { useTypingStatus } from "@/hooks/useTypingStatus";
import ChatLayout, { ChatPanel } from "@/components/chat/ChatLayout";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import { FullPageLoader } from "@/components/ui/Loading";

export default function ConversationPage() {
  const params = useParams<{ conversationId: string }>();
  const conversationId = params.conversationId;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const {
    messages,
    participant,
    loading,
    error,
    sendMessage,
  } = useMessages(conversationId);
  const { isOtherTyping, notifyTyping, stopTyping, typingError } =
    useTypingStatus(conversationId);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, router, user]);

  if (authLoading || !user) {
    return <FullPageLoader label="Đang mở cuộc trò chuyện..." />;
  }

  return (
    <ChatLayout conversationId={conversationId}>
      <ChatPanel>
        <ChatHeader profile={participant} />
        {loading && !participant ? (
          <FullPageLoader label="Đang tải tin nhắn..." />
        ) : (
          <>
            <MessageList
              messages={messages}
              ownUserId={user.id}
              isTyping={isOtherTyping}
              error={error ?? typingError}
            />
            {participant && (
              <MessageInput
                onSend={sendMessage}
                onTyping={notifyTyping}
                onStopTyping={stopTyping}
              />
            )}
          </>
        )}
      </ChatPanel>
    </ChatLayout>
  );
}
