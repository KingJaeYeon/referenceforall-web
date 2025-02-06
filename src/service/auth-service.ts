import { request } from "@/lib/axios";

export interface ILogin {
  username: string;
  password: string;
}

export interface IJoin {
  username: string;
  password: string;
  rePassword: string;
  name: string;
}

const prefix = (path: string) => `/auth/${path}`;

export function refreshTokens() {
  return request({
    url: prefix("refresh"),
    method: "POST",
  });
}

export function login(data: ILogin) {
  return request({
    url: prefix("login"),
    method: "POST",
    data: data,
  });
}

export function googleLogin() {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${prefix("google")}`;
}

export function logout() {
  return request({
    url: prefix("logout"),
    method: "POST",
  });
}

export function join(data: IJoin) {
  return request({
    url: prefix("join"),
    method: "POST",
    data,
  });
}
