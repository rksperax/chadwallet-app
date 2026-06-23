"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { ReactNode, useMemo } from "react";
import { RPC_URL } from "@/lib/constants";

export default function Providers({ children }: { children: ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Solana RPCs are required for Privy's sign/send transaction flow. Without
  // them you get "No RPC configuration found for chain solana:mainnet".
  const solanaRpcs = useMemo(() => {
    const wssUrl = RPC_URL.replace(/^http/, "ws"); // https -> wss, http -> ws
    return {
      "solana:mainnet": {
        rpc: createSolanaRpc(RPC_URL),
        rpcSubscriptions: createSolanaRpcSubscriptions(wssUrl),
        blockExplorerUrl: "https://solscan.io",
      },
    } as const;
  }, []);

  // Without an app id Privy can't initialize — render the app anyway so the
  // landing/trading pages still work (login button will prompt to configure).
  if (!appId) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#14f195",
          logo: "/brand/logo-mark.png",
          walletChainType: "solana-only",
        },
        loginMethods: ["google", "apple"],
        embeddedWallets: {
          solana: { createOnLogin: "users-without-wallets" },
        },
        solana: { rpcs: solanaRpcs },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
