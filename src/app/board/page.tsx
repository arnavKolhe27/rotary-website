import Image from "next/image";
import Link from "next/link";
import { getActiveBoard, Member, getCurrentRotaryYear } from "@/lib/db";
import FallbackAvatar from "@/components/FallbackAvatar";

// ─── Helper: renders a minimal portrait card (photo + name + designation) ──────
function RosterCard({ member }: { member: Member }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {/* Portrait thumbnail */}
      <div className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
        {member.photoURL ? (
          <Image
            src={member.photoURL}
            alt={member.name}
            fill
            className="object-cover"
            unoptimized={member.photoURL.startsWith("data:")}
          />
        ) : (
          <FallbackAvatar className="w-full h-full" />
        )}
      </div>
      {/* Name & role */}
      <div className="min-w-0">
        <p className="font-semibold text-[#0B2240] text-sm leading-tight truncate">
          {member.name}
        </p>
        <p className="text-xs text-slate-500 uppercase tracking-wide mt-0.5 truncate">
          {member.designation}
        </p>
      </div>
    </div>
  );
}

export default function ActiveBoardPage() {
  const currentYear = getCurrentRotaryYear();
  const members = getActiveBoard(currentYear);

  // ── Tier 1: Club President ────────────────────────────────────────────────
  const president = members.find(
    (m) =>
      m.designation === "Club President" || m.designation === "President"
  );

  // ── Tier 2: Secretaries (any designation containing "Secretary") ──────────
  const secretaries = members.filter((m) =>
    m.designation.toLowerCase().includes("secretary")
  );

  // ── Tier 3: Remaining board members ──────────────────────────────────────
  const presidentsId = president?.id;
  const secretaryIds = new Set(secretaries.map((s) => s.id));
  const roster = members.filter(
    (m) => m.id !== presidentsId && !secretaryIds.has(m.id)
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 pt-20 pb-12 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#0079C1] uppercase mb-1">
            Rotary Year {currentYear}
          </p>
          <h1 className="font-extrabold text-4xl md:text-5xl tracking-tight text-[#0B2240]">
            Board of Directors
          </h1>
          <p className="mt-3 text-slate-500 max-w-xl">
            Meet the leadership team driving service initiatives at the&nbsp;
            <span className="font-semibold text-[#0B2240]">
              Rotary Club of Amravati Ambika
            </span>{" "}
            for FY&nbsp;{currentYear}.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* ── TIER 1: President ─────────────────────────────────────────── */}
        {president && (
          <section className="flex flex-col items-center">
            <div className="mb-6 text-center">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#0079C1] bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
                Club President
              </span>
            </div>
            <Link
              href={`/past-presidents/${president.id}`}
              className="group max-w-sm w-full"
            >
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                {/* Photo */}
                <div className="relative h-80 bg-slate-100 overflow-hidden">
                  {president.photoURL ? (
                    <Image
                      src={president.photoURL}
                      alt={president.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={president.photoURL.startsWith("data:")}
                    />
                  ) : (
                    <FallbackAvatar className="w-full h-full" />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 px-6 text-white text-left">
                    <h2 className="text-2xl font-extrabold leading-tight">
                      {president.name}
                    </h2>
                    <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mt-0.5">
                      {president.designation}
                    </p>
                  </div>
                </div>
                {/* CTA strip */}
                <div className="px-6 py-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#0079C1] border-t border-gray-100 group-hover:bg-blue-50 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile & Legacy Projects
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── TIER 2: Secretaries ───────────────────────────────────────── */}
        {secretaries.length > 0 && (
          <section>
            <div className="mb-8 text-center">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full">
                Club Secretaries
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {secretaries.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="relative h-64 bg-slate-100 overflow-hidden">
                    {sec.photoURL ? (
                      <Image
                        src={sec.photoURL}
                        alt={sec.name}
                        fill
                        className="object-cover"
                        unoptimized={sec.photoURL.startsWith("data:")}
                      />
                    ) : (
                      <FallbackAvatar className="w-full h-full" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0B2240]">{sec.name}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">
                      {sec.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TIER 3: Full Roster ───────────────────────────────────────── */}
        {roster.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-[#0B2240]">
                Extended Board of Directors
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Complete roster of all serving board members for FY {currentYear}.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roster.map((member) => (
                <RosterCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* ── BOARD POSTER ──────────────────────────────────────────────── */}
        <section className="pt-8">
          <div className="mb-6 text-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-100 px-4 py-1.5 rounded-full">
              Official Board Roster
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-[#0B2240]">
              Board of Directors FY {currentYear}
            </h2>
          </div>
          <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <Image
              src="/board-poster.jpeg"
              alt={`Rotary Club of Amravati Ambika – Board of Directors FY ${currentYear}`}
              width={683}
              height={1024}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </section>

      </div>
    </div>
  );
}
