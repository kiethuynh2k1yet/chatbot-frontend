export type EmployeeLogin = {
  userId: number;
  employeeId: number;
  employeeCode: string;
  username: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  department: string | null;
  position: string | null;
};

type LoginResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: EmployeeLogin;
};

export const ACCESS_TOKEN_KEY = "minichat:employee-access-token";

function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "") ||
    "http://localhost:8081/api"
  );
}

export async function loginWithUsername(
  username: string,
  password: string,
): Promise<LoginResponse> {
  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Không kết nối được máy chủ đăng nhập. Hãy kiểm tra backend và thử lại.",
    );
  }

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const rawMessage =
      typeof body === "object" && body !== null && "message" in body
        ? body.message
        : null;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(" ")
      : typeof rawMessage === "string"
        ? rawMessage
        : "Đăng nhập không thành công. Vui lòng thử lại.";
    throw new Error(message);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("accessToken" in body) ||
    typeof body.accessToken !== "string" ||
    !("user" in body) ||
    typeof body.user !== "object" ||
    body.user === null ||
    !("username" in body.user) ||
    typeof body.user.username !== "string" ||
    !("fullName" in body.user) ||
    typeof body.user.fullName !== "string"
  ) {
    throw new Error("Máy chủ trả về dữ liệu đăng nhập không hợp lệ.");
  }

  return body as LoginResponse;
}

export function storeAccessToken(token: string): void {
  try {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    throw new Error("Không thể lưu phiên đăng nhập trong trình duyệt này.");
  }
}

export function clearAccessToken(): void {
  try {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    throw new Error("Không thể xóa phiên đăng nhập trong trình duyệt này.");
  }
}
