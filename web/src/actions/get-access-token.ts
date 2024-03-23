"use server";

import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string | null> {
  const tokenCookie = cookies().get("access_token");
  if (!tokenCookie) return null;
  return tokenCookie.value;
}
