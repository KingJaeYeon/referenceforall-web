"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import useUserStore from "@/store/userStore";
import { fetchMyAuthInfo } from "@/service/user-service";

type Props = {
  payload: any;
  children: React.ReactNode[] | React.ReactNode;
};
const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // 기본적으로 모든 쿼리에 적용
    },
    mutations: {
      retry: (failureCount: number, error: any) => {
        // 최대 2번까지 재시도하며, 인증에러일경우에만 재시도
        return failureCount <= 2 && error?.cause?.status === 401;
      },
    },
  },
};

export function SystemProvider({ children, payload }: Props) {
  const { setUser } = useUserStore();
  const queryClient = new QueryClient(config);

  useEffect(() => {
    if (payload !== null) {
      fetchMyAuthInfo().then((r) => {
        console.log(r);
        setUser(r.data);
      });
    }
  }, []);

  return (
    // <LocaleProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // </LocaleProvider>
  );
}
