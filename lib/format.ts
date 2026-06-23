export function abbreviateNumber(n?: number | null, digits = 2): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e12) return (n / 1e12).toFixed(digits) + "T";
  if (abs >= 1e9) return (n / 1e9).toFixed(digits) + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(digits) + "M";
  if (abs >= 1e3) return (n / 1e3).toFixed(digits) + "K";
  return n.toFixed(digits);
}

export function formatUsd(n?: number | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  if (n >= 1000) return "$" + abbreviateNumber(n);
  return "$" + abbreviateNumber(n);
}

// Price formatting that keeps precision for sub-cent memecoin prices.
export function formatPrice(n?: number | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  if (n === 0) return "$0";
  if (n >= 1) return "$" + n.toLocaleString(undefined, { maximumFractionDigits: 4 });
  if (n >= 0.01) return "$" + n.toFixed(4);
  // For very small prices, show significant digits.
  const decimals = Math.min(12, Math.max(4, Math.ceil(-Math.log10(n)) + 4));
  return "$" + n.toFixed(decimals);
}

export function formatPercent(n?: number | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return sign + n.toFixed(2) + "%";
}

export function shortAddress(addr?: string, chars = 4): string {
  if (!addr) return "";
  if (addr.length <= chars * 2 + 1) return addr;
  return `${addr.slice(0, chars)}…${addr.slice(-chars)}`;
}

export function timeAgo(unixSeconds: number): string {
  const diff = Math.max(0, Date.now() / 1000 - unixSeconds);
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
