"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { shortAddress } from "@/lib/format";

const HAS_PRIVY = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

function PrivyLogin() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const [open, setOpen] = useState(false);

  if (!ready) {
    return (
      <div className="h-10 w-28 animate-pulse rounded-xl bg-surface-2" />
    );
  }

  if (!authenticated) {
    return (
      <Button variant="secondary" className="font-bold" onClick={login}>
        Login
      </Button>
    );
  }

  const address = wallets[0]?.address;
  const email = user?.google?.email || user?.apple?.email || user?.email?.address;

  return (
    <div className="relative">
      <Button variant="secondary" onClick={() => setOpen((o) => !o)}>
        <span className="h-2 w-2 rounded-full bg-positive" />
        {address ? shortAddress(address, 4) : "Account"}
      </Button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-border bg-surface-2 p-3 shadow-xl"
          onMouseLeave={() => setOpen(false)}
        >
          {email && (
            <div className="mb-1 truncate text-xs text-muted">{email}</div>
          )}
          {address && (
            <div className="mb-3 break-all font-mono text-xs text-foreground">
              {address}
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            <LogOut size={16} /> Log out
          </Button>
        </div>
      )}
    </div>
  );
}

export default function LoginButton() {
  if (!HAS_PRIVY) {
    return (
      <Button
        variant="secondary"
        className="font-bold"
        title="Set NEXT_PUBLIC_PRIVY_APP_ID in .env.local to enable sign-in"
      >
        Login
      </Button>
    );
  }
  return <PrivyLogin />;
}
