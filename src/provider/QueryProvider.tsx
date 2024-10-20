"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = {
  defaultOptions: {
    mutations: {
      retry: (failureCount: number, error: any) => {
        // 최대 2번까지 재시도하며, 인증에러일경우에만 재시도
        return failureCount <= 2 && error?.cause?.status === 401;
      },
    },
  },
};

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

function QueryProvider({ children, ...props }: Props) {
  const queryClient = new QueryClient(config);
  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
