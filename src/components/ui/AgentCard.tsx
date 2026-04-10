"use client";

import { motion } from "framer-motion";

interface AgentCardProps {
  name: string;
  riskLevel: "low" | "medium" | "high";
  description: string;
  apy: number | null;
  isSelected: boolean;
  onSelect: () => void;
}

const riskConfig = {
  low: { label: "Conservative", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  medium: { label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  high: { label: "Degen", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
};

export default function AgentCard({
  name,
  riskLevel,
  description,
  apy,
  isSelected,
  onSelect,
}: AgentCardProps) {
  const risk = riskConfig[riskLevel];

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(0, 230, 118, 0.08)" }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-2xl border p-6 cursor-pointer transition-colors duration-200 ${
        isSelected
          ? "border-primary bg-card shadow-[0_0_20px_rgba(0,230,118,0.1)]"
          : "border-border bg-card hover:border-border-highlight/30"
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
      )}

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${risk.bg} ${risk.color} ${risk.border} border`}
        >
          {risk.label}
        </span>
      </div>

      <p className="text-muted text-sm leading-relaxed mb-6">{description}</p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Current APY</p>
          <p className="text-3xl font-bold text-primary">
            {apy !== null ? `${apy.toFixed(1)}%` : "---"}
          </p>
        </div>

        <button
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            isSelected
              ? "bg-primary text-background"
              : "bg-border text-foreground hover:bg-primary/20 hover:text-primary"
          }`}
        >
          {isSelected ? "Selected" : "Select Strategy"}
        </button>
      </div>
    </motion.div>
  );
}
