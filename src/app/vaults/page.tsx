"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import VaultTable from "@/components/dashboard/VaultTable";
import DepositModal from "@/components/deposit/DepositModal";
import { useVaults } from "@/hooks/useVaults";
import type { Vault } from "@/types";

export default function VaultsPage() {
  const { vaults, isLoading } = useVaults({ sortBy: "apy" });
  const [depositVault, setDepositVault] = useState<Vault | null>(null);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Vault Explorer
          </h1>
          <p className="text-sm text-muted mb-8">
            {vaults.length > 0 ? `${vaults.length} vaults` : "Loading vaults"} across all chains. Filter, sort, deposit.
          </p>

          <VaultTable vaults={vaults} isLoading={isLoading} onDeposit={setDepositVault} />
        </div>
      </main>

      {depositVault && (
        <DepositModal
          vault={depositVault}
          isOpen={!!depositVault}
          onClose={() => setDepositVault(null)}
        />
      )}
    </div>
  );
}
