export type UserType = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type UserAuthType = {
  accessToken: string;
  user: UserType;
};
