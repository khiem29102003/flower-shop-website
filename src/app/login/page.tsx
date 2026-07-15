'use client';
import { createClient } from '@/lib/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User is logged in, redirect to homepage
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-md-6">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Địa chỉ email',
                password_label: 'Mật khẩu',
                button_label: 'Đăng nhập',
                social_provider_text: 'Đăng nhập với {{provider}}',
                link_text: 'Đã có tài khoản? Đăng nhập',
              },
              sign_up: {
                email_label: 'Địa chỉ email',
                password_label: 'Mật khẩu',
                button_label: 'Đăng ký',
                social_provider_text: 'Đăng ký với {{provider}}',
                link_text: 'Chưa có tài khoản? Đăng ký',
              },
              forgotten_password: {
                email_label: 'Địa chỉ email',
                button_label: 'Gửi hướng dẫn',
                link_text: 'Quên mật khẩu?',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
