import axios from "axios";

import { UserAuthType, UserType } from "@/types/user";

export type SigninUserProps = {
  email: string;
  password: string;
};

export type SignupUserProps = SigninUserProps & {
  name: string;
};

export type GetUserProps = {
  accessToken: string;
};

const apiUser = "http://127.0.0.1:8080/api/user";

export async function signupUser(
  body: SignupUserProps
): Promise<UserType | null> {
  try {
    const { data } = await axios.post<UserType>(`${apiUser}/signup`, body);
    return data;
  } catch (error) {
    return null;
  }
}

export async function signinUser(body: SigninUserProps): Promise<UserAuthType> {
  const { data } = await axios.post<UserAuthType>(`${apiUser}/signin`, body);
  return data;
}

export async function getUser({
  accessToken,
}: GetUserProps): Promise<UserType> {
  const { data } = await axios.get<UserType>(`${apiUser}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}
