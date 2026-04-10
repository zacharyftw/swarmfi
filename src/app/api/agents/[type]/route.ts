import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/agentRunner';
import { fetchVaults } from '@/lib/lifi';
import { AgentType } from '@/types';

const VALID_AGENTS: AgentType[] = ['stable', 'conservative', 'degen'];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    if (!VALID_AGENTS.includes(type as AgentType)) {
      return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
    }

    // Fetch vaults from Earn API
    const vaultData = await fetchVaults({ sortBy: 'apy' });

    // Run the agent — API returns { data: [...] }
    const decision = await runAgent(type as AgentType, vaultData.data || vaultData);

    return NextResponse.json(decision);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
