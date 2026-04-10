"use client";

import { useQuery } from "@tanstack/react-query";
import type { Vault, VaultsResponse } from "@/types";

interface UseVaultsParams {
  chainId?: number;
  asset?: string;
  minTvl?: number;
  sortBy?: string;
}

export function useVaults(params?: UseVaultsParams) {
  const { data, isLoading, error } = useQuery<Vault[]>({
    queryKey: ["vaults", params],
    queryFn: async () => {
      const url = new URL("/api/vaults", window.location.origin);
      if (params?.chainId) url.searchParams.set("chainId", String(params.chainId));
      if (params?.asset) url.searchParams.set("asset", params.asset);
      if (params?.minTvl) url.searchParams.set("minTvl", String(params.minTvl));
      if (params?.sortBy) url.searchParams.set("sortBy", params.sortBy);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Failed to fetch vaults: ${res.status}`);

      const json: VaultsResponse = await res.json();
      // Filter for transactional vaults only
      return json.data.filter((v) => v.isTransactional === true);
    },
    staleTime: 60_000, // 1 minute
    refetchInterval: 120_000, // 2 minutes
  });

  return {
    vaults: data ?? [],
    isLoading,
    error: error as Error | null,
  };
}
