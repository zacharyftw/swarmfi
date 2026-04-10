"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Flame } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import AgentCard from "@/components/ui/AgentCard";
import VaultCard from "@/components/ui/VaultCard";
import ProofOfStrategy from "@/components/dashboard/ProofOfStrategy";
import PortfolioBreakdown from "@/components/dashboard/PortfolioBreakdown";

const agents = [
  {
    id: "stable",
    name: "Stable Agent",
    riskLevel: "low" as const,
    description:
      "Focuses on blue-chip stablecoin yields across battle-tested lending protocols. Prioritizes capital preservation with steady, predictable returns. Targets Aave, Compound, and Spark.",
    apy: 5.2,
    icon: Shield,
  },
  {
    id: "conservative",
    name: "Conservative Agent",
    riskLevel: "medium" as const,
    description:
      "Balances ETH staking, liquid staking derivatives, and moderate DeFi strategies. Accepts some volatility for higher yields. Operates across Lido, Rocket Pool, and Pendle.",
    apy: 8.7,
    icon: Zap,
  },
  {
    id: "degen",
    name: "Degen Agent",
    riskLevel: "high" as const,
    description:
      "Hunts for the highest yields through concentrated liquidity, leveraged farming, and new protocol incentives. High risk, high reward. Active on Uniswap V4, GMX, and emerging protocols.",
    apy: 24.3,
    icon: Flame,
  },
];

const vaults = [
  {
    protocol: "Aave V3",
    chain: "Ethereum",
    asset: "USDC",
    apy: 4.8,
    tvl: 2_400_000_000,
    riskScore: 2,
    tags: ["Stablecoin", "Blue Chip", "Audited"],
  },
  {
    protocol: "Compound V3",
    chain: "Base",
    asset: "USDC",
    apy: 5.1,
    tvl: 890_000_000,
    riskScore: 2,
    tags: ["Stablecoin", "Blue Chip"],
  },
  {
    protocol: "Lido",
    chain: "Ethereum",
    asset: "stETH",
    apy: 3.2,
    tvl: 14_200_000_000,
    riskScore: 3,
    tags: ["Liquid Staking", "ETH"],
  },
  {
    protocol: "Pendle",
    chain: "Arbitrum",
    asset: "PT-stETH",
    apy: 12.4,
    tvl: 320_000_000,
    riskScore: 5,
    tags: ["Fixed Yield", "LST"],
  },
  {
    protocol: "Uniswap V4",
    chain: "Arbitrum",
    asset: "ETH/USDC",
    apy: 42.3,
    tvl: 180_000_000,
    riskScore: 7,
    tags: ["LP", "Concentrated", "IL Risk"],
  },
  {
    protocol: "GMX V2",
    chain: "Arbitrum",
    asset: "GLP",
    apy: 18.9,
    tvl: 520_000_000,
    riskScore: 6,
    tags: ["Perps", "Real Yield"],
  },
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
          {/* Subtle gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,230,118,0.06)_0%,_transparent_70%)]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
            >
              Yield{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mullet
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-xl font-medium text-primary/80"
            >
              Business in the front, yield in the back.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-muted"
            >
              An AI agent swarm that continuously scans, evaluates, and
              rebalances your DeFi positions across chains. Choose your risk
              appetite and let the agents do the rest &mdash; transparent
              reasoning, on-chain execution, no black boxes.
            </motion.p>
          </div>
        </section>

        {/* Agent Strategy Cards */}
        <section id="strategy" className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Choose Your Agent
            </h2>
            <p className="text-sm text-muted mb-8">
              Each agent runs a distinct strategy calibrated to a different risk
              profile.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  name={agent.name}
                  riskLevel={agent.riskLevel}
                  description={agent.description}
                  apy={agent.apy}
                  isSelected={selectedAgent === agent.id}
                  onSelect={() =>
                    setSelectedAgent(
                      selectedAgent === agent.id ? null : agent.id
                    )
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Vaults */}
        <section id="vaults" className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Active Vault Opportunities
            </h2>
            <p className="text-sm text-muted mb-8">
              Live yield sources being monitored and allocated to by the agent
              swarm.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vaults.map((vault) => (
                <VaultCard key={`${vault.protocol}-${vault.asset}`} {...vault} />
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Dashboard
            </h2>
            <p className="text-sm text-muted mb-8">
              Real-time portfolio overview and agent decision transparency.
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              <PortfolioBreakdown />
              <ProofOfStrategy />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-xs text-muted">
        Yield Mullet &mdash; AI-powered DeFi yield aggregation. Built on
        Starknet &amp; EVM chains.
      </footer>
    </div>
  );
}
