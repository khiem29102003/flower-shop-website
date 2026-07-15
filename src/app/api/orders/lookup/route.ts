
'use server'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email là bắt buộc' }, { status: 400 })
  }

  const supabase = createClient()

  try {
    // Check if any orders exist for this email
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Return the found orders
    return NextResponse.json({ orders });

  } catch (error: any) {
    console.error('Error looking up order:', error)
    return NextResponse.json({ error: `Lỗi máy chủ: ${error.message}` }, { status: 500 })
  }
}
