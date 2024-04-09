// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    const next = url.searchParams.get('next') ?? '/';
    if (!error) {
      throw redirect(303, `/${next.slice(1)}`);
    }
  }

  throw redirect(303, '/')
}
