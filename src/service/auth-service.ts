import { request } from "@/lib/axios";

export interface ILogin {
  email: string;
  password: string;
}

export interface IJoin {
  email: string;
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
    url: "/auth/login",
    method: "POST",
    data: data,
  });
}

export function logout() {
  return request({
    url: "/auth/logout",
    method: "POST",
  });
}

export function join(data: IJoin) {
  return request({
    url: "/auth/join",
    method: "POST",
    data,
  });
}
