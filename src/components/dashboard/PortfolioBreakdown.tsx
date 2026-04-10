"use client";

import { PieChart, Wallet } from "lucide-react";

interface Allocation {
  label: string;
  percentage: number;
  color: string;
  gradient?: string;
}

const chainAllocations: Allocation[] = [
  { label: "Ethereum", percentage: 35, color: "bg-blue-400", gradient: "from-blue-400 to-blue-500" },
  { label: "Arbitrum", percentage: 25, color: "bg-sky-400", gradient: "from-sky-400 to-sky-500" },
  { label: "Optimism", percentage: 15, color: "bg-red-400", gradient: "from-red-400 to-red-500" },
  { label: "Base", percentage: 15, color: "bg-blue-500", gradient: "from-blue-500 to-blue-600" },
  { label: "Polygon", percentage: 10, color: "bg-purple-400", gradient: "from-purple-400 to-purple-500" },
];

const assetAllocations: Allocation[] = [
  { label: "USDC", percentage: 30, color: "bg-blue-300", gradient: "from-blue-300 to-blue-400" },
  { label: "ETH / stETH", percentage: 28, color: "bg-indigo-400", gradient: "from-indigo-400 to-indigo-500" },
  { label: "WBTC", percentage: 15, color: "bg-orange-400", gradient: "from-orange-400 to-orange-500" },
  { label: "DAI / sDAI", percentage: 12, color: "bg-yellow-400", gradient: "from-yellow-400 to-yellow-500" },
  { label: "LP Positions", percentage: 15, color: "bg-primary", gradient: "from-primary to-secondary" },
];

function SegmentedBar({ allocations }: { allocations: Allocation[] }) {
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-border/50">
      {allocations.map((a) => (
        <div
          key={a.label}
          className={`bg-gradient-to-r ${a.gradient || ""} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
          style={{ width: `${a.percentage}%` }}
          title={`${a.label}: ${a.percentage}%`}
        />
      ))}
    </div>
  );
}

function Legend({ allocations }: { allocations: Allocation[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
      {allocations.map((a) => (
        <div key={a.label} className="flex items-center gap-2 text-sm">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${a.color}`}
          />
          <span className="text-muted">{a.label}</span>
          <span className="font-medium text-foreground tabular-nums">
            {a.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PortfolioBreakdown() {
  // Simulating connected state with hardcoded data
  const isConnected = true;

  if (!isConnected) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center justify-center min-h-[300px]">
        <Wallet className="h-10 w-10 text-muted/40 mb-4" />
        <p className="text-muted text-sm mb-2">No wallet connected</p>
        <p className="text-muted/60 text-xs">
          Connect your wallet to see portfolio breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="h-5 w-5 text-secondary" />
        <h3 className="text-lg font-semibold text-foreground">
          Portfolio Breakdown
        </h3>
      </div>

      {/* Chain allocation */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-muted mb-2">
          By Chain
        </p>
        <SegmentedBar allocations={chainAllocations} />
        <Legend allocations={chainAllocations} />
      </div>

      {/* Asset allocation */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted mb-2">
          By Asset
        </p>
        <SegmentedBar allocations={assetAllocations} />
        <Legend allocations={assetAllocations} />
      </div>

      {/* Total value */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted">Total Value Locked</span>
        <span className="text-xl font-bold text-primary tabular-nums">
          $124,832.47
        </span>
      </div>
    </div>
  );
}
