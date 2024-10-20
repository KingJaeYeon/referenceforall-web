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

  const updateUrlParam = useCallback(
    (name: string, value: string) => {
      const queryString = createQueryString(name, value);
      router.push(pathname + "?" + queryString);
    },
    [createQueryString, router, pathname],
  );

  return { updateUrlParam };
}
