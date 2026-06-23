import type { NextConfig } from "next";

// --- Server-side localStorage shim ---
// Node 25 exposes an experimental `localStorage` global that throws unless a
// `--localstorage-file` is provided. Some wallet/SDK deps (Privy, @solana/kit)
// probe `localStorage` during SSR, which then crashes the build/render.
// We replace it with an in-memory shim on the server only. This file is loaded
// in every build/runtime worker before any page module, so the shim is in place
// early. It has no effect in the browser, where the real localStorage is used.
if (typeof window === "undefined") {
  const store = new Map<string, string>();
  const memoryStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
  try {
    Object.defineProperty(globalThis, "localStorage", {
      value: memoryStorage,
      configurable: true,
      writable: true,
    });
  } catch {
    // ignore if the environment forbids redefining it
  }
}

const nextConfig: NextConfig = {
  // Token logos come from many arbitrary CDNs; we render them via <img>, so no
  // next/image domain config is needed here.
};

export default nextConfig;
