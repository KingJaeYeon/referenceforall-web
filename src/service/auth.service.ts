import { request } from "@/lib/axios";

export interface ILogin {
  username: string;
  password: string;
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

export function validUsername(username: string) {
  return request({
    url: prefix("validate/username"),
    method: "POST",
    data: { username },
  });
}

export function validSignupCode({ email, verify }: { email: string; verify: string }) {
  return request({
    url: prefix("validate/email"),
    method: "POST",
    data: { email, verify },
  });
}
