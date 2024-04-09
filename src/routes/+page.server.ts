import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()

  // if the user is already logged in return them to the account page
  if (session) {
    console.log(session)
    redirect(303, '/app')
  }

  return { url: url.origin }
}