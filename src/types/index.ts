// Vault from LI.FI Earn API
export interface Vault {
  address: string;
  name: string;
  chainId: number;
  protocol: {
    name: string;
    url?: string;
  };
  asset: {
    symbol: string;
    address: string;
    decimals: number;
  };
  apy: {
    base: number | null;
    reward: number | null;
    total: number | null;
    apy7d: number | null;
  };
  analytics: {
    tvl: {
      usd: string; // NOTE: string not number per API docs
    };
  };
  tags: string[];
  isTransactional: boolean;
  network: string;
}

// Agent types
export type RiskLevel = 'low' | 'medium' | 'high';
export type AgentType = 'stable' | 'conservative' | 'degen';

export interface AgentDecision {
  agent: AgentType;
  timestamp: string;
  selectedVaults: VaultAllocation[];
  reasoning: string;
  riskScore: number;
}

export interface VaultAllocation {
  vault: Vault;
  allocationPercent: number;
  reason: string;
}

export interface ComposerQuote {
  transactionRequest: {
    to: string;
    data: string;
    value: string;
    gasLimit: string;
    chainId: number;
  };
  estimate: {
    fromAmount: string;
    toAmount: string;
    gasCosts: Array<{ amount: string; token: { symbol: string } }>;
  };
}

export interface PortfolioPosition {
  vault: Vault;
  balance: string;
  balanceUsd: string;
}

export interface AgentConfig {
  type: AgentType;
  name: string;
  riskLevel: RiskLevel;
  systemPrompt: string;
}
