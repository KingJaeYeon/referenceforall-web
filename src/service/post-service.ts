import { server } from "@/lib/axios-server";

const prefix = (path: string) => `/posts/${path}`;

export function fetchTags(params: { type?: "recommend"; take: number }) {
  return server({
    url: prefix("recommend-tags"),
    params,
  });
}
