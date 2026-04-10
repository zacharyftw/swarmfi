import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolio } from '@/lib/lifi';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    const data = await fetchPortfolio(address);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
