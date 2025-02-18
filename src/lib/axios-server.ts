import axios, { AxiosRequestConfig } from "axios";
import { refreshTokens } from "@/service/auth-service";

let server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status < 400 || status === 401;
  },
  withCredentials: true,
});

server.interceptors.response.use(
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
    // refresh token

    return Promise.reject(error?.response?.data ?? error);
  },
);

export const request = async function (options: AxiosRequestConfig) {
  console.log(options.url);
  return server(options);
};
