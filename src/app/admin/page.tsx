import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="pt-4">
      <h1>Chào mừng trở lại, Admin!</h1>
      <p className="lead">Đây là trang quản trị của bạn.</p>
      {user && <p>Bạn đang đăng nhập với email: <strong>{user.email}</strong></p>}
      <hr />
      <p>Từ đây, bạn có thể quản lý sản phẩm, đơn hàng và các nội dung khác của trang web.</p>
    </div>
  );
}
