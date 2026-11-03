# MiniChat

MiniChat là ứng dụng nhắn tin 1-1 xây dựng bằng Next.js App Router, TypeScript,
styled-components và Supabase. Đăng nhập, danh sách bạn bè, tin nhắn, trạng thái
online và trạng thái đang nhập đều được đồng bộ qua Supabase Realtime; quyền
truy cập dữ liệu được kiểm soát bằng Row Level Security (RLS).

## Yêu cầu

- Node.js 20 trở lên và npm
- Một dự án Supabase

## Cài đặt và chạy local

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
```

Điền URL và anon/publishable key của dự án Supabase vào `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

Không sử dụng `service_role` key trong frontend. Key public được bảo vệ bằng
các policy RLS trong migrations.

Trang `/login` xác thực username nhân viên qua backend tại `NEXT_PUBLIC_API_URL`
và giữ JWT trong `sessionStorage` của tab hiện tại. Cần chạy backend và cấu hình
CORS cho origin frontend. Phiên đăng nhập backend hiện chưa liên kết với phiên
chat Supabase.

Áp dụng các migration trong `supabase/migrations/` theo thứ tự tên. Có thể chạy
các câu lệnh SQL trong Supabase Dashboard → SQL Editor, hoặc dùng Supabase CLI:

```powershell
npx supabase login
npx supabase init
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Migration tạo profile tự động sau đăng ký, bảng hội thoại/tin nhắn/trạng thái
nhập liệu, bucket `avatars`, policy Storage, RLS và đăng ký các bảng cần thiết
vào publication `supabase_realtime`.

Trong Supabase Dashboard, đặt Site URL là `http://localhost:3000` khi phát triển
và cấu hình URL redirect tương ứng. Nếu bật xác nhận email, người dùng sẽ thấy
hướng dẫn xác nhận trước khi đăng nhập; tắt yêu cầu xác nhận email để chuyển
thẳng tới `/chats` ngay sau khi đăng ký.

```powershell
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Tạo hai tài khoản riêng để
thử tìm bạn, nhắn tin trực tiếp, typing indicator và trạng thái online. Để kiểm
tra production:

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## Cấu trúc chính

```text
app/
  login/                    Đăng nhập
  register/                 Đăng ký
  chats/                    Danh sách, tìm người dùng và chat 1-1
components/
  auth/                     Form đăng nhập/đăng ký
  chat/                     Sidebar, header, danh sách tin và composer
  styles/                   ThemeProvider, GlobalStyle, theme, breakpoints
  ui/                       Button, Input, Avatar, AuthCard, trạng thái
hooks/                      Auth, conversations, messages, presence, typing
lib/
  supabase/client.ts        Supabase browser client (không chứa secret)
  validators/               Zod schemas
supabase/
  migrations/               Schema, trigger, RLS, Storage và Realtime
types/                      Domain và Supabase Database types
```

## Hành vi và quyền truy cập

- `/` chuyển người dùng đã đăng nhập tới `/chats`, người khác tới `/login`.
- Mỗi cặp người dùng chỉ có một hội thoại; RPC chuẩn hóa thứ tự UUID trước khi
  tạo và được thực thi dưới RLS.
- Chỉ thành viên hội thoại mới đọc được nội dung và gửi tin nhắn; `sender_id`
  bắt buộc là người đang đăng nhập.
- Người dùng chỉ sửa profile của chính mình. Các profile chỉ được đọc bởi
  người dùng đã xác thực để hỗ trợ tìm kiếm.
- Typing status giới hạn theo hội thoại và chỉ người dùng sở hữu được sửa.
- Trạng thái online được heartbeat mỗi phút; trạng thái cũ hơn hai phút được
  hiển thị như offline để tránh giữ chấm xanh sau khi mất kết nối đột ngột.
- Ảnh đại diện tùy chọn được lưu trong bucket công khai `avatars`; chỉ chủ tài
  khoản được tải lên hoặc thay ảnh trong thư mục UUID của mình. Ảnh tối đa 3 MB.

## Ghi chú triển khai

Supabase Realtime cần bật cho `messages`, `profiles` và `typing_status`; migration
đã đăng ký ba bảng vào publication. Các thao tác dữ liệu chạy bằng Supabase
browser client và chịu kiểm soát RLS, không cần API route dùng service key.
