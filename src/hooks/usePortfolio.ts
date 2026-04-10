"use client";

import { useQuery } from "@tanstack/react-query";
import type { PortfolioPosition } from "@/types";

export function usePortfolio(address: string | undefined) {
  const { data, isLoading, error } = useQuery<PortfolioPosition[]>({
    queryKey: ["portfolio", address],
    queryFn: async () => {
      if (!address) return [];
      const res = await fetch(`/api/portfolio/${address}`);
      if (!res.ok) throw new Error(`Failed to fetch portfolio: ${res.status}`);
      return res.json();
    },
    enabled: !!address,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  return {
    positions: data ?? [],
    isLoading,
    error: error as Error | null,
  };
}
