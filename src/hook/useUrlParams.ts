import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  const updateUrlParams = useCallback(
    (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsToUpdate).forEach(([name, value]) => {
        if (value === "") {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });

      router.push(pathname + "?" + params.toString());
    },
    [searchParams, router, pathname],
  );

  return { updateUrlParams };
}
