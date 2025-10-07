import { useMemo } from "react";
import headerJson from "@/data/header-data.json";
import { HeaderData } from "@/types/resource";

export function useHeaderYears() {
  const header = (headerJson as HeaderData[])[0];

  const years = useMemo(() => {
    const future = Array.from(
      { length: header.number_of_years },
      (_, i) => header.base_year + 1 + i
    );
    return [header.base_year, ...future];
  }, [header]);

  return { header, years, baseYear: years[0], futureYears: years.slice(1) };
}
