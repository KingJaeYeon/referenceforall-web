"use client";

import axios, { AxiosRequestConfig } from "axios";
import { logout, refreshTokens } from "@/service/auth-service";

let client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status < 400 || status === 401;
  },
  withCredentials: true,
});

client.interceptors.response.use(
  async (res) => {
    const { status } = res;

    if (status === 401) {
      await refreshTokens().then((r: any) => {
        if (r.logout) {
          window.location.href = "/";
        }
      });
      throw new Error("refresh token", { cause: { status: status } });
    }

    return res.data;
  },
  (error) => {
    const { code, message, path, status, timestamp } = error.response.data;

    // refresh token

    return Promise.reject(error.response.data);
  },
);



export const request = async function (options: AxiosRequestConfig) {
  return client(options);
};

export const changeServerLang = (lang: string) => {
  console.log("changeServerLang", lang);
  client.defaults.headers.common["x-lang"] = lang;
};
