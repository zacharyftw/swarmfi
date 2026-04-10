"use client";

import { motion } from "framer-motion";

interface VaultCardProps {
  protocol: string;
  chain: string;
  asset: string;
  apy: number;
  tvl: number;
  riskScore: number; // 1-10
  tags: string[];
}

const chainColors: Record<string, string> = {
  Ethereum: "bg-blue-400",
  Arbitrum: "bg-sky-400",
  Optimism: "bg-red-400",
  Polygon: "bg-purple-400",
  Base: "bg-blue-500",
  Avalanche: "bg-red-500",
};

function formatTvl(tvl: number): string {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(1)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(1)}K`;
  return `$${tvl}`;
}

function riskColor(score: number): string {
  if (score <= 3) return "bg-green-400";
  if (score <= 6) return "bg-yellow-400";
  return "bg-red-400";
}

export default function VaultCard({
  protocol,
  chain,
  asset,
  apy,
  tvl,
  riskScore,
  tags,
}: VaultCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-highlight/30"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground">{protocol}</h4>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                chainColors[chain] || "bg-gray-400"
              }`}
            />
            {chain}
          </span>
        </div>
        <span className="text-sm font-medium text-muted">{asset}</span>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs text-muted uppercase tracking-wider mb-0.5">APY</p>
          <p className="text-2xl font-bold text-primary">{apy.toFixed(1)}%</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted uppercase tracking-wider mb-0.5">TVL</p>
          <p className="text-lg font-semibold text-foreground">{formatTvl(tvl)}</p>
        </div>
      </div>

      {/* Risk bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted">Risk Score</span>
          <span className="text-xs font-medium text-muted">{riskScore}/10</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border">
          <div
            className={`h-full rounded-full transition-all ${riskColor(riskScore)}`}
            style={{ width: `${riskScore * 10}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
