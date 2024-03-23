"use server";

import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setCookie(
  name: string,
  value: string,
  options?: Partial<ResponseCookie>
): Promise<void> {
  cookies().set(name, value, options);
}
