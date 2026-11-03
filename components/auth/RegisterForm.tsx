"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, LoaderCircle } from "lucide-react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/lib/validators/authSchema";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthCard, {
  AuthBrand,
  AuthFooter,
  AuthSubtitle,
  AuthTitle,
  BrandMark,
} from "@/components/ui/AuthCard";
import ErrorMessage from "@/components/ui/ErrorMessage";

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
`;

const SuccessMessage = styled.p`
  margin: 0;
  padding: 12px;
  border-radius: 11px;
  color: #166534;
  background: #f0fdf4;
  font-size: 13px;
  line-height: 1.55;
`;

export default function RegisterForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setConfirmationRequired(false);
    const parsed = registerSchema.safeParse({
      displayName,
      email: email.trim(),
      password,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra thông tin.");
      return;
    }

    setBusy(true);
    try {
      const hasSession = await signUp(
        parsed.data.displayName,
        parsed.data.email,
        parsed.data.password,
      );
      if (hasSession) router.replace("/chats");
      else setConfirmationRequired(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Đăng ký không thành công. Vui lòng thử lại.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthCard>
      <AuthBrand>
        <BrandMark>
          <MessageCircle size={20} fill="currentColor" />
        </BrandMark>
        MiniChat
      </AuthBrand>
      <AuthTitle>Tạo tài khoản mới</AuthTitle>
      <AuthSubtitle>Bắt đầu kết nối và nhắn tin với bạn bè.</AuthSubtitle>
      <Form onSubmit={handleSubmit}>
        <Field htmlFor="displayName">
          Tên hiển thị
          <Input
            id="displayName"
            autoComplete="name"
            placeholder="Nguyễn Minh Anh"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        </Field>
        <Field htmlFor="email">
          Email
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="ban@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field htmlFor="password">
          Mật khẩu
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Ít nhất 6 ký tự"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {confirmationRequired && (
          <SuccessMessage>
            Tài khoản đã được tạo. Vui lòng xác nhận email để hoàn tất đăng ký,
            sau đó đăng nhập.
          </SuccessMessage>
        )}
        <Button type="submit" disabled={busy}>
          {busy ? <LoaderCircle size={17} /> : null}
          Đăng ký
          {!busy && <ArrowRight size={17} />}
        </Button>
      </Form>
      <AuthFooter>
        Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
      </AuthFooter>
    </AuthCard>
  );
}
