import TrendingList from "@/components/trade/TrendingList";
import TokenHeader from "@/components/trade/TokenHeader";
import PriceChart from "@/components/trade/PriceChart";
import ActivityPanel from "@/components/trade/ActivityPanel";
import TradePanel from "@/components/trade/TradePanel";

export default async function TradePage({
  params,
}: {
  params: Promise<{ mint: string }>;
}) {
  const { mint } = await params;

  return (
    <div className="lg:h-[calc(100dvh-138px)] lg:overflow-hidden">
      <div className="grid grid-cols-1 lg:h-full lg:grid-cols-[280px_1fr_360px]">
        {/* Left: trending */}
        <aside className="border-b border-border lg:border-b-0 lg:border-r lg:overflow-hidden">
          <TrendingList activeMint={mint} />
        </aside>

        {/* Middle: token info + chart + activity */}
        <section className="scroll-thin min-w-0 border-b border-border lg:border-b-0 lg:overflow-y-auto">
          <TokenHeader mint={mint} />
          <PriceChart mint={mint} />
          <div className="border-t border-border">
            <ActivityPanel mint={mint} />
          </div>
        </section>

        {/* Right: trade panel */}
        <aside className="scroll-thin lg:border-l lg:overflow-y-auto">
          <TradePanel mint={mint} />
        </aside>
      </div>
    </div>
  );
}
