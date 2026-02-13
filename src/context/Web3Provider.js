"use client";
import { useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const Web3Provider = ({ children }) => {
  // Creating QueryClient inside useState prevents hydration issues in Next.js
  const [queryClient] = useState(() => new QueryClient());

  const config = createConfig(
    getDefaultConfig({
      chains: [sepolia, hardhat],
      transports: {
        [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
        [hardhat.id]: http(),
      },
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
      appName: "DAO Governance",
      ssr: true, // Fixes "Failed to establish lazy connection"
    })
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};