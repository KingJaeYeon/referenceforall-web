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

export interface Link {
  url: string;
  label: string;
}

export interface MyProfile {
  id: string;
  displayName: string;
  bio?: string;
  username: string;
  links: Link[] | [];
}

export async function fetchMyAuthInfo() {
  const result = await server({
    url: prefix(`myinfo`),
  });
  return result.data;
}

export function fetchUserProfile(params: { displayName: string }) {
  return server({
    url: prefix(`detail/${params.displayName}`),
  });
}

export function fetchUserProfileDetail(params: { displayName: string }) {
  return server({
    url: prefix(`detail/${params.displayName}/about`),
  });
}

export async function fetchMyProfile(): Promise<MyProfile> {
  const result = await request({
    url: prefix("profile"),
    method: "GET",
  });

  return result.data;
}

export async function fetchAccountInfo() {
  const result = await request({
    url: prefix("my-account"),
    method: "GET",
  });

  return result.data;
}

export async function sendEmailVerificationForEmailUpdate(data: { email: string }) {
  return request({
    url: prefix("request-email-verification"),
    method: "POST",
    data,
  });
}

export async function updateMyProfile(data: Omit<MyProfile, "id">) {
  return request({
    url: prefix("profile"),
    method: "PUT",
    data,
  });
}

export async function updateMyAvatar({ avatar }: { avatar: File }) {
  const formData = new FormData();
  formData.append("file", avatar);
  return request({
    url: prefix("avatar"),
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
}
