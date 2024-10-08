import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface DateRange {
  [key: string]: any;
}

type Option = { key: string; value: any };

export interface QueryParamsProps {
  options?: Option[];
}

export default function useQueryParams({ options }: QueryParamsProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<DateRange>({});

  const generateQuery = () => {
    // 1. 기본값 설정
    let defaultArray: Option[] = [
      { key: "page", value: 1 },
      { key: "sort", value: "createdAt_desc" },
      { key: "listNum", value: 20 },
    ];

    // 2. "options"이 있을 경우 추가
    const isOptions = !!options && options?.length > 0;
    if (isOptions) {
      defaultArray = [...defaultArray, ...options];
    }

    // 3. query 생성
    // 3-1. "defaultArray"와 "options"의 "key"가 중복일 경우 뒤에 있는 "options"으로 덮어씀
    // 3-2. "searchParams"에 해당 "key"가 있으면 최우선 적용
    let newQuery = defaultArray.reduce((acc: DateRange, cur: Option) => {
      const value = searchParams.get(cur.key);
      acc[cur.key] = value || cur.value;
      return acc;
    }, {});

    // 4. date가 있는 경우 00:00:00 ~ 23:59:59로 변경
    if (!!newQuery["start_date"]) {
      newQuery["start_date"] = new Date(newQuery["start_date"]).setHours(
        0,
        0,
        0,
        0,
      );
    }
    if (!!newQuery["end_date"]) {
      newQuery["end_date"] = new Date(newQuery["end_date"]).setHours(
        23,
        59,
        59,
        999,
      );
    }
    return newQuery;
  };

  useEffect(() => {
    const newQuery = generateQuery();

    // 5. query 변경 시에만 setQuery
    // 5-1. "JSON.stringify"로 비교해서 변경안되었으면 "prev"를 반환해서 상태를 변경하지 않음
    setQuery((prevQuery) => {
      const isEqual = JSON.stringify(prevQuery) === JSON.stringify(newQuery);
      return isEqual ? prevQuery : newQuery;
    });
  }, [generateQuery, options, searchParams]);

  return query;
}
