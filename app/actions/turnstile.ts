"use server"

export async function getTurnstileSiteKey() {
  // Return the site key from server-side environment variable
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"
}
