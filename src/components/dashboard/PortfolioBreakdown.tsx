"use client";

import { PieChart } from "lucide-react";

interface Allocation {
  label: string;
  percentage: number;
  color: string;
}

const chainAllocations: Allocation[] = [
  { label: "Ethereum", percentage: 35, color: "bg-blue-400" },
  { label: "Arbitrum", percentage: 25, color: "bg-sky-400" },
  { label: "Optimism", percentage: 15, color: "bg-red-400" },
  { label: "Base", percentage: 15, color: "bg-blue-500" },
  { label: "Polygon", percentage: 10, color: "bg-purple-400" },
];

const assetAllocations: Allocation[] = [
  { label: "USDC", percentage: 30, color: "bg-blue-300" },
  { label: "ETH / stETH", percentage: 28, color: "bg-indigo-400" },
  { label: "WBTC", percentage: 15, color: "bg-orange-400" },
  { label: "DAI / sDAI", percentage: 12, color: "bg-yellow-400" },
  { label: "LP Positions", percentage: 15, color: "bg-primary" },
];

function SegmentedBar({ allocations }: { allocations: Allocation[] }) {
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full">
      {allocations.map((a) => (
        <div
          key={a.label}
          className={`${a.color} transition-all duration-500`}
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
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${a.color}`} />
          <span className="text-muted">{a.label}</span>
          <span className="font-medium text-foreground">{a.percentage}%</span>
        </div>
      ))}
    </div>
  );
}

export default function PortfolioBreakdown() {
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
        <span className="text-xl font-bold text-primary">$124,832.47</span>
      </div>
    </div>
  );
}
