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

client.interceptors.response.use(async (res) => {
  const { status } = res;

  if (status === 401) {
    await refreshTokens().then((r: any) => {
      if (r.logout) {
        window.location.href = "/";
      }
    });
    throw new Error("refresh token", { cause: { status: status } });
  }

  return res;
});

const onSuccess = function (response: any) {
  return response.data;
};

const onError = async function (error: any) {
  // IP 가드
  // if (error.response.data.message === "Invalid IP") {
  //   await logout();
  //   window.location.href = "/";
  // }

  if (error?.cause?.status === 401) {
    const message = error.message ?? "uncaught error";
    const status = error.cause.status;

    console.log(message + ", " + status);
    throw new Error(message, { cause: { status: status } });
  }

  if (error?.response?.status) {
    const message = error.response.data.message ?? "uncaught error";
    const status = error.response.status;

    console.log(message + ", " + status);
    throw new Error(message, { cause: { status } });
  }

  throw new Error("uncaught error");
};

export const request = async function (options: AxiosRequestConfig) {
  return client(options).then(onSuccess).catch(onError);
};
