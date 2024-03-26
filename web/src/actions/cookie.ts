"use server";

import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string | null> {
  const tokenCookie = cookies().get("access_token");
  if (!tokenCookie) return null;
  return tokenCookie.value;
}

export async function setCookie(
  name: string,
  value: string,
  options?: Partial<ResponseCookie>
): Promise<void> {
  cookies().set(name, value, options);
}

export async function deleteCookie(name: string) {
  return cookies().delete(name);
}
