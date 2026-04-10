"use client";

import { motion } from "framer-motion";
import { Brain, Terminal } from "lucide-react";

interface StrategyEntry {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  reasoning: string;
}

const placeholderLogs: StrategyEntry[] = [
  {
    id: "1",
    timestamp: "2026-04-11T14:32:00Z",
    agent: "Stable Agent",
    action: "Rebalanced USDC from Aave to Compound",
    reasoning:
      "Compound V3 USDC supply rate increased to 4.8% (vs Aave 4.1%). Gas cost amortized over 30d holding exceeds rate differential. Executing migration of 60% allocation.",
  },
  {
    id: "2",
    timestamp: "2026-04-11T13:15:00Z",
    agent: "Degen Agent",
    action: "Entered ETH/USDC LP on Uniswap V4 (Arbitrum)",
    reasoning:
      "Concentrated liquidity range [3200-3600] shows elevated fee APR of 42.3%. IL risk acceptable given 7d mean-reversion signal from volatility model. Position sized at 15% of degen allocation.",
  },
  {
    id: "3",
    timestamp: "2026-04-11T11:48:00Z",
    agent: "Conservative Agent",
    action: "Increased stETH allocation on Lido",
    reasoning:
      "ETH staking yield stable at 3.2%. Lido validator set health score 98/100. Increasing allocation by 10% from idle WETH reserves. No smart contract risk events detected in last 90d.",
  },
  {
    id: "4",
    timestamp: "2026-04-11T09:22:00Z",
    agent: "Stable Agent",
    action: "Exited DAI position on Spark Protocol",
    reasoning:
      "DSR rate decreased to 3.1% following governance vote MIP-142. Reallocating to sDAI vault on Base (3.9% effective rate after bridge costs).",
  },
];

const agentColors: Record<string, string> = {
  "Stable Agent": "text-green-400",
  "Conservative Agent": "text-amber-400",
  "Degen Agent": "text-red-400",
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function ProofOfStrategy() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Agent Brain &mdash; Strategy Log
        </h3>
        <Terminal className="h-4 w-4 text-muted ml-auto" />
      </div>

      {/* Terminal-style container */}
      <div className="rounded-xl bg-background/80 border border-border p-4 max-h-[420px] overflow-y-auto">
        <div className="space-y-4">
          {placeholderLogs.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-border pl-4 pb-2 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs font-mono text-muted/60">
                  {formatTime(entry.timestamp)}
                </span>
                <span
                  className={`text-xs font-semibold ${agentColors[entry.agent] || "text-primary"}`}
                >
                  {entry.agent}
                </span>
              </div>

              <p className="text-sm font-medium text-foreground mb-1.5">
                {entry.action}
              </p>

              <p className="text-xs font-mono leading-relaxed text-muted/70 bg-card/50 rounded-lg px-3 py-2 border border-border/50">
                {entry.reasoning}
                <span className="inline-block w-1.5 h-3.5 bg-primary ml-1 align-middle animate-blink" />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
