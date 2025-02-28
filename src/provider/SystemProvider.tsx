"use client";
import React from "react";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/provider/UserProvider";

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
  const queryClient = new QueryClient(config);

  return (
    // <LocaleProvider>
    <QueryClientProvider client={queryClient}>
      <UserProvider payload={payload}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
    // </LocaleProvider>
  );
}
