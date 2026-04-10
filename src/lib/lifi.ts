const EARN_BASE_URL = 'https://earn.li.fi';
const COMPOSER_BASE_URL = 'https://li.quest';

export async function fetchVaults(params?: {
  chainId?: number;
  asset?: string;
  minTvl?: number;
  sortBy?: string;
  cursor?: string;
}) {
  const url = new URL(`${EARN_BASE_URL}/v1/earn/vaults`);
  if (params?.chainId) url.searchParams.set('chainId', String(params.chainId));
  if (params?.asset) url.searchParams.set('asset', params.asset);
  if (params?.minTvl) url.searchParams.set('minTvl', String(params.minTvl));
  if (params?.sortBy) url.searchParams.set('sortBy', params.sortBy);
  if (params?.cursor) url.searchParams.set('cursor', params.cursor);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Earn API error: ${res.status}`);
  return res.json();
}

export async function fetchVaultDetail(chainId: number, address: string) {
  const res = await fetch(`${EARN_BASE_URL}/v1/earn/vaults/${chainId}/${address}`);
  if (!res.ok) throw new Error(`Vault detail error: ${res.status}`);
  return res.json();
}

export async function fetchChains() {
  const res = await fetch(`${EARN_BASE_URL}/v1/earn/chains`);
  if (!res.ok) throw new Error(`Chains error: ${res.status}`);
  return res.json();
}

export async function fetchProtocols() {
  const res = await fetch(`${EARN_BASE_URL}/v1/earn/protocols`);
  if (!res.ok) throw new Error(`Protocols error: ${res.status}`);
  return res.json();
}

export async function fetchPortfolio(userAddress: string) {
  const res = await fetch(`${EARN_BASE_URL}/v1/earn/portfolio/${userAddress}/positions`);
  if (!res.ok) throw new Error(`Portfolio error: ${res.status}`);
  return res.json();
}

export async function getComposerQuote(params: {
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string; // This MUST be the vault address, NOT the underlying token
  fromAddress: string;
  toAddress: string;
  fromAmount: string;
  slippage?: number;
}) {
  const url = new URL(`${COMPOSER_BASE_URL}/v1/quote`);
  url.searchParams.set('fromChain', String(params.fromChain));
  url.searchParams.set('toChain', String(params.toChain));
  url.searchParams.set('fromToken', params.fromToken);
  url.searchParams.set('toToken', params.toToken);
  url.searchParams.set('fromAddress', params.fromAddress);
  url.searchParams.set('toAddress', params.toAddress);
  url.searchParams.set('fromAmount', params.fromAmount);
  url.searchParams.set('slippage', String(params.slippage ?? 0.005));
  url.searchParams.set('integrator', 'Mullet');

  const apiKey = process.env.LIFI_API_KEY;
  if (!apiKey) throw new Error('LIFI_API_KEY not set');

  // NOTE: Composer quote is a GET request, NOT POST
  const res = await fetch(url.toString(), {
    headers: { 'x-lifi-api-key': apiKey },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Composer error: ${res.status} - ${error}`);
  }
  return res.json();
}
