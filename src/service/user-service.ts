import { request } from "@/lib/axios";

export interface ISignup {
  username: string;
  password: string;
  displayName?: string;
  verifyCode?: string;
  type: string;
}

const prefix = (path: string) => `/users/${path}`;

export function signup(data: ISignup) {
  return request({
    url: prefix("signup"),
    method: "POST",
    data,
  });
}