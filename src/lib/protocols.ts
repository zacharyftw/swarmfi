export const protocolNames: Record<string, string> = {
  "morpho-v1": "Morpho",
  "morpho-v2": "Morpho",
  "aave-v3": "Aave V3",
  "yo-protocol": "YO Protocol",
  "pendle": "Pendle",
  "spark": "Spark",
  "fluid": "Fluid",
  "euler-v2": "Euler",
  "ethena": "Ethena",
  "etherfi": "Ether.fi",
  "maple": "Maple",
  "compound-v3": "Compound",
  "neverland": "Neverland",
  "concrete": "Concrete",
  "kelp": "Kelp",
  "kinetiq": "Kinetiq",
  "hyperlend": "HyperLend",
  "hypurrfi": "Hypurrfi",
  "tokemak": "Tokemak",
  "upshift": "Upshift",
  "usdai": "USDAi",
  "avon": "Avon",
  "felix-vanilla": "Felix",
};

export function cleanProtocolName(slug: string): string {
  return protocolNames[slug] || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function formatTvl(tvlStr: string): string {
  const tvl = parseFloat(tvlStr);
  if (isNaN(tvl)) return "$0";
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(1)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(0)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(0)}K`;
  return `$${tvl.toFixed(0)}`;
}

export function formatApy(apy: number | null): string {
  if (apy === null || apy === undefined) return "\u2014";
  if (apy >= 100) return `${apy.toFixed(0)}%`;
  if (apy >= 10) return `${apy.toFixed(1)}%`;
  return `${apy.toFixed(2)}%`;
}
