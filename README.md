# MiniChat

**Ứng dụng chat 1-1 thời gian thực trên trình duyệt.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ecf8e?logo=supabase)](https://supabase.com/)

**Tìm người dùng · Nhắn tin trực tiếp · Theo dõi trạng thái online**

---

## Tính năng

- Đăng ký tài khoản chat bằng email, tên hiển thị và mật khẩu.
- Tìm người dùng theo tên hoặc email để bắt đầu cuộc trò chuyện 1-1.
- Nhận tin nhắn mới và cập nhật danh sách chat theo thời gian thực.
- Hiển thị trạng thái đang nhập và trạng thái online của người dùng.
- Cập nhật tên hiển thị và ảnh đại diện.
- Bảo vệ dữ liệu bằng Row Level Security (RLS) trong Supabase.
- Giao diện thích ứng với màn hình nhỏ và lớn.
- Có màn hình đăng nhập nhân viên riêng, xác thực qua backend.

## Sử dụng

1. Mở `/register` để tạo tài khoản chat.
2. Tìm bạn bằng tên hoặc email trong danh sách chat.
3. Chọn người dùng và gửi tin nhắn; cuộc trò chuyện sẽ được tạo nếu chưa có.
4. Chọn ảnh đại diện hoặc cập nhật tên hiển thị từ khu vực tài khoản.

> **Lưu ý về đăng nhập:** `/login` hiện dùng username và mật khẩu nhân viên do backend xác thực. JWT của backend chỉ được lưu trong `sessionStorage` và **không** tạo phiên đăng nhập Supabase cho phần chat. Phần chat dùng Supabase Auth; để vào chat ngay sau khi đăng ký, hãy tắt yêu cầu xác nhận email trong Supabase. Khi xác nhận email được bật, ứng dụng hiện chưa có màn hình đăng nhập email/mật khẩu Supabase.

## Bắt đầu

Cần có Node.js 20 trở lên, npm và một dự án Supabase. Nếu muốn dùng màn hình đăng nhập nhân viên, cần thêm backend có endpoint `POST /auth/login`.

```powershell
git clone https://github.com/kiethuynh2k1yet/chatbot-frontend.git
cd chatbot-frontend
npm install
Copy-Item .env.example .env.local
```

Điền thông tin dự án Supabase vào `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

`NEXT_PUBLIC_API_URL` là URL gốc của API backend; màn hình đăng nhập nhân viên gọi `POST {NEXT_PUBLIC_API_URL}/auth/login`. Nếu không dùng đăng nhập nhân viên, biến này không cần thiết. Không đặt Supabase `service_role` key trong ứng dụng frontend.

### Cấu hình Supabase

Chạy các migration trong `supabase/migrations/` theo thứ tự tên, bằng Supabase Dashboard → **SQL Editor** hoặc Supabase CLI. Các migration tạo profile sau đăng ký, bảng hội thoại/tin nhắn/trạng thái nhập, RPC tạo hội thoại, policy RLS, bucket `avatars` và đăng ký bảng cho Supabase Realtime.

Ví dụ dùng Supabase CLI:

```powershell
npx supabase login
npx supabase init
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Trong Supabase Dashboard, đặt **Site URL** thành `http://localhost:3000`. Để tài khoản vừa đăng ký vào chat ngay, tắt yêu cầu xác nhận email trong cấu hình Authentication của dự án.

### Chạy ứng dụng

```powershell
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Để kiểm tra chat thời gian thực, đăng ký hai tài khoản riêng trong hai phiên trình duyệt.

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy máy chủ phát triển. |
| `npm run lint` | Kiểm tra mã nguồn bằng ESLint. |
| `npm run build` | Tạo bản build production. |
| `npm run start` | Chạy bản production đã build. |

## Công nghệ

- [Next.js 16](https://nextjs.org/) App Router và [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) Auth, Postgres, Storage và Realtime
- [styled-components](https://styled-components.com/)
- [Zod](https://zod.dev/) để kiểm tra dữ liệu biểu mẫu
- [Lucide](https://lucide.dev/) cho biểu tượng

## Cấu trúc

```text
app/
  login/                    Đăng nhập nhân viên qua backend
  register/                 Đăng ký tài khoản chat qua Supabase Auth
  chats/                    Danh sách và hội thoại
components/
  auth/                     Biểu mẫu đăng nhập/đăng ký
  chat/                     Sidebar, tin nhắn và khu vực chat
  styles/                   Theme, breakpoint và GlobalStyle
  ui/                       Thành phần giao diện dùng chung
hooks/                      Auth, hội thoại, tin nhắn, presence và typing
lib/
  api/auth.ts               Tích hợp API đăng nhập nhân viên
  supabase/client.ts        Supabase browser client
  validators/               Schema kiểm tra dữ liệu
supabase/
  migrations/               Schema, RLS, Storage và Realtime
types/                      Kiểu dữ liệu ứng dụng và Supabase
```

## Quyền truy cập và giới hạn

- Chỉ thành viên của một hội thoại mới đọc được hội thoại và tin nhắn trong đó.
- Người gửi tin nhắn phải là người dùng đang đăng nhập; nội dung tin nhắn dài tối đa 4.000 ký tự.
- Mỗi cặp người dùng chỉ có một hội thoại; RPC chuẩn hóa thứ tự UUID trước khi tạo.
- Người dùng chỉ được cập nhật hồ sơ của mình; hồ sơ đã xác thực có thể đọc để hỗ trợ tìm kiếm.
- Chỉ thành viên hội thoại mới đọc trạng thái nhập; mỗi người dùng chỉ cập nhật trạng thái của mình.
- Trạng thái online được cập nhật mỗi phút khi trang đang hiển thị và chuyển offline khi trang đóng hoặc phiên đăng xuất.
- Ảnh đại diện lưu trong bucket công khai `avatars`; giới hạn 3 MB, định dạng JPEG, PNG, WebP hoặc GIF.
- Ảnh đại diện công khai có thể xem được bởi bất kỳ ai có URL.
- API đăng nhập nhân viên và tài khoản Supabase Auth là hai phiên độc lập; đăng nhập nhân viên hiện không cấp quyền chat.

## Đóng góp

Mở issue để báo lỗi hoặc đề xuất tính năng, hoặc gửi pull request. Trước khi gửi thay đổi, hãy chạy:

```powershell
npm run lint
npm run build
```

## Giấy phép

Repository hiện chưa khai báo giấy phép.
