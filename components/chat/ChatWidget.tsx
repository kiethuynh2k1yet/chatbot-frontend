"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import {
  BotIcon,
  Bubble,
  ChatWindow,
  CloseButton,
  Composer,
  HeaderText,
  Messages,
  OnlineIndicator,
  QuickReplies,
  StatusText,
  Toggle,
  TypingIndicator,
  WidgetFooter,
  WidgetRoot,
  WindowHeader,
} from "./ChatWidget.styles";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Xin chào 👋 Mình là trợ lý ChatFlow. Bạn cần tìm hiểu điều gì hôm nay?",
  },
];

const quickQuestions = [
  "ChatFlow hoạt động thế nào?",
  "Tôi có thể thử miễn phí không?",
];

const assistantReply =
  "ChatFlow AI hỗ trợ doanh nghiệp trả lời khách hàng, học từ kiến thức bạn cung cấp và chuyển tiếp hội thoại cho nhân viên khi cần. Bạn có thể bắt đầu tìm hiểu bằng cách tạo chatbot miễn phí nhé!";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = (value: string) => {
    const text = value.trim();

    if (!text || typing) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text },
    ]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: assistantReply,
        },
      ]);
      setTyping(false);
    }, 850);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <WidgetRoot>
      {open && (
        <ChatWindow role="dialog" aria-label="Chat với ChatFlow AI">
          <WindowHeader>
            <BotIcon>
              <Bot size={20} />
            </BotIcon>

            <HeaderText>
              <strong>Trò chuyện với ChatFlow</strong>
              <StatusText>
                <OnlineIndicator />
                Thường phản hồi trong giây lát
              </StatusText>
            </HeaderText>

            <CloseButton
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng chat"
            >
              <X size={18} />
            </CloseButton>
          </WindowHeader>

          <Messages ref={listRef} aria-live="polite">
            {messages.map((message) => (
              <Bubble key={message.id} $user={message.role === "user"}>
                {message.text}
              </Bubble>
            ))}

            {typing && (
              <TypingIndicator aria-label="Đang soạn tin nhắn">
                <span />
                <span />
                <span />
              </TypingIndicator>
            )}
          </Messages>

          {messages.length === 1 && (
            <QuickReplies>
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </QuickReplies>
          )}

          <Composer onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              aria-label="Tin nhắn"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Gửi tin nhắn"
            >
              <Send size={15} />
            </button>
          </Composer>

          <WidgetFooter>
            Được hỗ trợ bởi{" "}
            <strong>
              ChatFlow AI <Sparkles size={10} style={{ display: "inline" }} />
            </strong>
          </WidgetFooter>
        </ChatWindow>
      )}

      <Toggle
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Đóng cửa sổ chat" : "Mở cửa sổ chat"}
        aria-expanded={open}
      >
        {open ? <X /> : <MessageCircle />}
      </Toggle>
    </WidgetRoot>
  );
}
