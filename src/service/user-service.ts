import { request } from "@/lib/axios";
import { server } from "@/lib/axios-server";

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

export function fetchUser(params: { displayName: string }) {
  return server({
    url: prefix("detail"),
    params,
  });
}

export function fetchAboutUser(params: { displayName: string }) {
  return server({
    url: prefix("detail/about"),
    params,
  });
}

export async function fetchMyProfile() {
  const result = await request({
    url: prefix("my-info"),
    method: "GET",
  });

  return result.data;
}

export async function updateMyProfile() {
  return request({
    url: prefix("my-info"),
    method: "POST",
  });
}

export async function updateMyAvatar({ avatar }: { avatar: File }) {
  const formData = new FormData();
  formData.append("file", avatar);
  return request({
    url: prefix("avatar"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
}
