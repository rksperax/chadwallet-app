import { Connection, PublicKey } from "@solana/web3.js";
import { RPC_URL, SOL_MINT } from "./constants";

let _conn: Connection | null = null;
export function getConnection(): Connection {
  if (!_conn) _conn = new Connection(RPC_URL, "confirmed");
  return _conn;
}

// Returns the UI balance of SOL for an owner.
export async function getSolBalance(owner: string): Promise<number> {
  try {
    const conn = getConnection();
    const lamports = await conn.getBalance(new PublicKey(owner));
    return lamports / 1e9;
  } catch {
    return 0;
  }
}

// Returns the summed UI balance of an SPL token across the owner's accounts.
export async function getTokenBalance(
  owner: string,
  mint: string
): Promise<number> {
  if (mint === SOL_MINT) return getSolBalance(owner);
  try {
    const conn = getConnection();
    const res = await conn.getParsedTokenAccountsByOwner(new PublicKey(owner), {
      mint: new PublicKey(mint),
    });
    let total = 0;
    for (const { account } of res.value) {
      const ui = account.data.parsed?.info?.tokenAmount?.uiAmount;
      if (typeof ui === "number") total += ui;
    }
    return total;
  } catch {
    return 0;
  }
}
