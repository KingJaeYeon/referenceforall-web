import { Base64 } from "js-base64";
import { cookies } from "next/headers";
import { Authorization } from "@/config";

function parsePayload(access: string | undefined) {
  if (!access) return null;

  // Base64 부분 추출
  let payload = access.split(".")[1];
  // UTF-8로 디코딩
  const userString = Base64.decode(payload);
  return JSON.parse(userString);
}


export async function getJwtPayload() {
  const cookieStore = await cookies();
  const access = cookieStore.get(Authorization);
  return parsePayload(access?.value);
}