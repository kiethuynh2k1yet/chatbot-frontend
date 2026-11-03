"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, LogOut, MessageCircle } from "lucide-react";
import styled from "styled-components";
import {
  clearAccessToken,
  loginWithUsername,
  storeAccessToken,
  type EmployeeLogin,
} from "@/lib/api/auth";
import { loginSchema } from "@/lib/validators/authSchema";
import AuthCard, {
  AuthBrand,
  AuthFooter,
  AuthSubtitle,
  AuthTitle,
  BrandMark,
} from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input";

const Form = styled.form`
  display: grid;
  gap: 17px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
`;

const SuccessMessage = styled.div`
  display: grid;
  gap: 5px;
  padding: 13px;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  color: #166534;
  background: #f0fdf4;
  font-size: 13px;
  line-height: 1.55;

  strong {
    font-size: 14px;
  }
`;

const SessionNote = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.55;
`;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [employee, setEmployee] = useState<EmployeeLogin | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const parsed = loginSchema.safeParse({ username, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra thông tin.");
      return;
    }

    setBusy(true);
    try {
      const result = await loginWithUsername(
        parsed.data.username,
        parsed.data.password,
      );
      storeAccessToken(result.accessToken);
      setEmployee(result.user);
      setPassword("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Đăng nhập không thành công. Vui lòng thử lại.",
      );
    } finally {
      setBusy(false);
    }
  }

  function handleSignOut() {
    try {
      clearAccessToken();
      setEmployee(null);
      setUsername("");
      setError(null);
    } catch (signOutError) {
      setError(
        signOutError instanceof Error
          ? signOutError.message
          : "Không thể đăng xuất.",
      );
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
      {employee ? (
        <>
          <AuthTitle>Đăng nhập thành công</AuthTitle>
          <AuthSubtitle>Tài khoản nhân viên đã được xác thực.</AuthSubtitle>
          <SuccessMessage role="status">
            <strong>Xin chào, {employee.fullName}</strong>
            <span>
              Username: {employee.username} · Mã nhân viên:{" "}
              {employee.employeeCode}
            </span>
          </SuccessMessage>
          <SessionNote>
            Phiên JWT được lưu trong tab hiện tại. Tài khoản nhân viên chưa được
            liên kết với phiên chat Supabase.
          </SessionNote>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="button" $variant="outline" onClick={handleSignOut}>
            <LogOut size={17} />
            Đăng xuất
          </Button>
        </>
      ) : (
        <>
          <AuthTitle>Đăng nhập nhân viên</AuthTitle>
          <AuthSubtitle>
            Nhập username và mật khẩu tài khoản do quản trị viên cấp.
          </AuthSubtitle>
          <Form onSubmit={handleSubmit}>
            <Field htmlFor="username">
              Username
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Nhập username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                maxLength={100}
                required
              />
            </Field>
            <Field htmlFor="password">
              Mật khẩu
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                maxLength={200}
                required
              />
            </Field>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={busy}>
              {busy ? <LoaderCircle size={17} /> : null}
              Đăng nhập
              {!busy && <ArrowRight size={17} />}
            </Button>
          </Form>
          <AuthFooter>
            Chỉ tài khoản nhân viên đã được cấp mới có thể đăng nhập.
          </AuthFooter>
        </>
      )}
    </AuthCard>
  );
}
