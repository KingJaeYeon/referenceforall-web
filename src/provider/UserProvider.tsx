"use client";
import { ReactNode, useEffect } from "react";
import useUserStore from "@/store/userStore";
import { fetchMyAuthInfo } from "@/service/user-service";
import { useQuery } from "@tanstack/react-query";

export default function UserProvider({ children, payload }: { children: ReactNode; payload: any }) {
  const { setUser } = useUserStore();
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: fetchMyAuthInfo,
    enabled: !!payload,
  });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  if (!payload) {
    return children;
  }

  return !isPending && children;
}
