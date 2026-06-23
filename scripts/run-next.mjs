#!/usr/bin/env node
// Launches the Next.js CLI, adding `--localstorage-file` ONLY on Node >= 25.
//
// Node 25 ships an experimental `localStorage` global whose getter throws unless
// the process was started with `--localstorage-file`. Wallet SDKs (Privy,
// @solana/kit) probe `localStorage` during SSR, which crashes the build/render.
// Older Node (e.g. Node 22 on Vercel) has no such global and ignores the flag,
// so we only inject it when needed — keeping production builds untouched.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const args = process.argv.slice(2);

const major = Number(process.versions.node.split(".")[0]);
const env = { ...process.env };
if (major >= 25) {
  const flag = `--localstorage-file=${process.cwd()}/.next-ls.json`;
  env.NODE_OPTIONS = [env.NODE_OPTIONS, flag].filter(Boolean).join(" ");
}

const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: "inherit",
  env,
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
