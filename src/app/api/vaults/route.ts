import { NextRequest, NextResponse } from 'next/server';
import { fetchVaults } from '@/lib/lifi';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data = await fetchVaults({
      chainId: searchParams.get('chainId') ? Number(searchParams.get('chainId')) : undefined,
      asset: searchParams.get('asset') || undefined,
      minTvl: searchParams.get('minTvl') ? Number(searchParams.get('minTvl')) : undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      cursor: searchParams.get('cursor') || undefined,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
