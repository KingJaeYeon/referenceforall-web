import { request } from "@/lib/axios";

export interface ILogin {
  accountId: string;
  password: string;
}

export interface IJoin {
  accountId: string;
  password: string;
  rePassword: string;
  name: string;
}

export function refreshTokens() {
  return request({
    url: "/auth/refresh",
    method: "POST",
  });
}

export function login(data: ILogin) {
  return request({
    url: "/admins/login",
    method: "POST",
    data: data,
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "GET",
  });
}

export function join(data: IJoin) {
  return request({
    url: "/auth/join",
    method: "POST",
    data,
  });
}
