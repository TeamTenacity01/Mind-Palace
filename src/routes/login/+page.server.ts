// src/routes/+page.server.ts
import type { PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError } from '@supabase/supabase-js'


export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()

  // if the user is already logged in return them to the account page
  if (session) {
    console.log(session)
    throw redirect(303, '/app')
  }

  return { url: url.origin }
}


export const actions = {
  handleGoogleLogin: async ({ url, locals: { supabase } }) => {    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${url.origin}/auth/callback?next=/app`,
        },
    })
          
    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        alert("Google Not Worky")
        return fail(400, {
          error: 'Invalid credentials.',
        })
      }
      alert("Server error m8")
      return fail(500, {
        error: 'Server error. Try again later.',
      })
    }

    if (data.url) {
      console.log(data.url)
      redirect(303, data.url) // use the redirect API for your server framework
    }
  },

  handleGithubLogin: async ({ url, locals: { supabase } }) => {    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${url.origin}/auth/callback?next=/app`,
      },
    })
          
    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        alert("Github Not Worky")
        return fail(400, {
          error: 'Invalid credentials.',
        })
      }
      alert("Server error m8")
      return fail(500, {
        error: 'Server error. Try again later.',
      })
    }

    if (data.url) {
      redirect(303, data.url) // use the redirect API for your server framework
    }
  },

  handleOTPLogin: async ({ url, request, locals: { supabase } }) => {
    const formData = await request.formData()

    const email = formData.get('email') as string
    console.log(email)

    const { error } = await supabase.auth.signInWithOtp({ 
      email: email,
      options:{
        // set this to false if you do not want the user to be automatically signed up
        // shouldCreateUser: false,
        emailRedirectTo: `${url.origin}/auth/callback?next=/app`,
      },
    })
    console.log("here now")
    if (error) {
      console.log(error)
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          error: 'Invalid credentials.',
          values: {
            email,
          },
        })
      }
      return fail(500, {
        error: 'Server error. Try again later.',
        values: {
          email,
        },
      })
    }
    
    console.log('Check your email for login link!')
  },

  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut()
    console.log("THAT SHIT SIGNED ME OUT")
    throw redirect(303, '/login')
  },
}