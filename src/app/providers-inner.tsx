"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  optimism,
  polygon,
  base,
  mainnet,
  avalanche,
} from "wagmi/chains";
import { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "Yield Mullet",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",
  chains: [mainnet, arbitrum, optimism, polygon, base, avalanche],
  ssr: false,
});

export default function ProvidersInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#00e676",
            accentColorForeground: "#0a0f0a",
            borderRadius: "medium",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
