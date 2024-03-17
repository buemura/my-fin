import axios from "axios";

import { UserAuthType, UserType } from "@/types/user";
import { env } from "@/utils/env";

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

const apiUser = env.VITE_BACKEND_URL + "/user";

export class UserService {
  static async signupUser(body: SignupUserProps): Promise<UserType> {
    const { data } = await axios.post<UserType>(`${apiUser}/signup`, body);
    return data;
  }

  static async signinUser(body: SigninUserProps): Promise<UserAuthType> {
    const { data } = await axios.post<UserAuthType>(`${apiUser}/signin`, body);
    return data;
  }

  static async getUser({ accessToken }: GetUserProps): Promise<UserType> {
    const { data } = await axios.get<UserType>(`${apiUser}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
}
