import { getPastPresidents, getCurrentRotaryYear } from "@/lib/db";
import PastPresidentsClient from "./PastPresidentsClient";

export const dynamic = 'force-dynamic';


export default async function PastPresidentsPage() {
  const currentYear = getCurrentRotaryYear();
  const members = await getPastPresidents(currentYear);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <section className="bg-white border-b border-gray-100 pt-20 pb-12 px-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-bold text-4xl tracking-tight text-[#0B2240] mb-2">Historical Ledger</h1>
          <p className="text-xs font-semibold tracking-widest text-[#0079C1] uppercase">Honoring Our Past Presidents</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <PastPresidentsClient members={members} />
      </section>
    </div>
  );
}

