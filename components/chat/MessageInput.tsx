"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { messageSchema } from "@/lib/validators/messageSchema";

const Composer = styled.div`
  padding: 13px clamp(14px, 4vw, 40px) 17px;
  border-top: 1px solid #edf0f4;
  background: #fff;

  form {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
`;

const Textarea = styled.textarea<{ $height: number }>`
  width: 100%;
  min-height: 46px;
  max-height: 140px;
  height: ${({ $height }) => `${$height}px`};
  resize: none;
  padding: 13px 15px;
  border: 1px solid #edf0f4;
  border-radius: 14px;
  outline: none;
  color: #0f172a;
  background: #f7f8fa;
  font-size: 14px;
  line-height: 1.4;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &::placeholder {
    color: #9aa4b2;
  }

  &:focus {
    border-color: #b6d2ff;
    box-shadow: 0 0 0 3px rgba(0, 104, 255, 0.08);
  }
`;

const SendButton = styled(Button)<{ $hasText: boolean }>`
  width: 46px;
  min-width: 46px;
  height: 46px;
  padding: 0;
  border-radius: 14px;
  background: ${({ $hasText }) => ($hasText ? "#0068ff" : "#b8c5d6")};
  box-shadow: ${({ $hasText }) =>
    $hasText ? "0 6px 14px rgba(0, 104, 255, .2)" : "none"};
`;

const Helper = styled.div`
  margin: 7px 2px 0;
  color: #a0a9b7;
  font-size: 11px;
`;

const ErrorGap = styled.div`
  margin-bottom: 9px;
`;

export default function MessageInput({
  onSend,
  onTyping,
  onStopTyping,
}: {
  onSend: (content: string) => Promise<void>;
  onTyping: () => void;
  onStopTyping: () => void;
}) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textareaHeight, setTextareaHeight] = useState(46);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const hasText = content.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const parsed = messageSchema.safeParse({ content });
    if (!parsed.success) {
      if (content.trim()) {
        setError(parsed.error.issues[0]?.message ?? "Tin nhắn không hợp lệ.");
      }
      return;
    }
    setSending(true);
    setError(null);
    try {
      await onSend(parsed.data.content);
      setContent("");
      onStopTyping();
      setTextareaHeight(46);
    } catch (sendError) {
      setError(
        sendError instanceof Error ? sendError.message : "Không thể gửi tin nhắn.",
      );
    } finally {
      setSending(false);
      textarea.current?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function updateContent(value: string) {
    setContent(value);
    setError(null);
    if (value.trim()) onTyping();
    else onStopTyping();
    if (textarea.current) {
      setTextareaHeight(Math.min(textarea.current.scrollHeight, 140));
    }
  }

  return (
    <Composer>
      {error && (
        <ErrorGap>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorGap>
      )}
      <form onSubmit={handleSubmit}>
        <Textarea
          ref={textarea}
          rows={1}
          $height={textareaHeight}
          value={content}
          onChange={(event) => updateContent(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          aria-label="Nhập tin nhắn"
          maxLength={4000}
          disabled={sending}
        />
        <SendButton
          type="submit"
          disabled={!hasText || sending}
          $hasText={hasText}
          aria-label="Gửi tin nhắn"
          title="Gửi tin nhắn (Enter)"
        >
          {sending ? <LoaderCircle size={18} /> : <Send size={18} />}
        </SendButton>
      </form>
      <Helper>Enter để gửi · Shift + Enter để xuống dòng</Helper>
    </Composer>
  );
}
