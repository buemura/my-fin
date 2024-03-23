import axios from "axios";

import { getAccessToken } from "@/actions/get-access-token";
import { setCookie } from "@/actions/set-cookie";
import { env } from "@/env.mjs";
import { UserAuthType, UserType } from "@/types/user";

export type SigninUserProps = {
  email: string;
  password: string;
};

export type SignupUserProps = SigninUserProps & {
  name: string;
};

const apiUser = env.NEXT_PUBLIC_BACKEND_URL + "/user";

export class UserService {
  static async signupUser(body: SignupUserProps): Promise<UserType> {
    const { data } = await axios.post<UserType>(`${apiUser}/signup`, body);
    return data;
  }

  static async signinUser(body: SigninUserProps): Promise<UserAuthType> {
    const { data } = await axios.post<UserAuthType>(`${apiUser}/signin`, body);

    if (data && data.accessToken) {
      setCookie("access_token", data?.accessToken, {
        secure: true,
      });
    }

    return data;
  }

  static async getUser(): Promise<UserType> {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("Missing access_token");
    }

    const { data } = await axios.get<UserType>(`${apiUser}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
}
