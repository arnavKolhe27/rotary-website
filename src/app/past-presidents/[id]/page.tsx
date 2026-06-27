"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const CATEGORY_COLORS: Record<string, string> = {
  Education: "bg-blue-100 text-blue-700",
  Medical: "bg-red-100 text-red-700",
  "Other Initiatives": "bg-emerald-100 text-emerald-700",
};

export default function PastPresidentPortal() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [president, setPresident] = useState<any>(null);
  const [presProjects, setPresProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Helper: derive current rotary year (July–June cycle)
    const now = new Date();
    const yr = now.getFullYear();
    const currentRotaryYear =
      now.getMonth() < 6 ? `${yr - 1}-${yr}` : `${yr}-${yr + 1}`;

    Promise.all([
      fetch("/api/members").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ])
      .then(([membersData, projectsData]) => {
        let pres: any;

        if (id === "current-president") {
          // Intercept sentinel ID → resolve by designation + current year
          pres = (membersData as any[]).find(
            (m) =>
              (m.designation === "Club President" ||
                m.designation === "President") &&
              m.year === currentRotaryYear
          );
        } else {
          pres = (membersData as any[]).find((m: any) => m.id === id);
        }

        if (!pres) { setLoading(false); return; }
        setPresident(pres);
        const linked = (projectsData as any[]).filter(
          (p) => p.operatingYear && p.operatingYear === pres.year
        );
        setPresProjects(linked);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#003087] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!president) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold text-gray-700">Profile not found.</p>
        <button
          onClick={() => router.push("/past-presidents")}
          className="px-8 py-3 bg-[#003087] text-white font-bold rounded-full hover:bg-[#0B2240] transition-colors"
        >
          Back to Past Presidents
        </button>
      </div>
    );
  }

  const hasPhoto = president.photoURL && president.photoURL.trim() !== "";
  const hasBio =
    president.bio &&
    (president.bio.achievements || president.bio.projects || president.bio.milestones);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sticky breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/past-presidents")}
            className="flex items-center gap-2 text-sm font-bold text-[#003087] hover:text-[#0B2240] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Past Presidents
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500 font-medium truncate">{president.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-14">
        {/* Leader Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0B2240] to-[#003087] h-3 w-full" />
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="w-44 h-44 md:w-56 md:h-56 relative rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md bg-gray-100">
                {hasPhoto ? (
                  <Image
                    src={president.photoURL}
                    alt={president.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 176px, 224px"
                    unoptimized={president.photoURL.startsWith("data:")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#003087] to-[#0079C1]">
                    <svg className="w-20 h-20 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#F0F4FF] text-[#003087] text-xs font-bold px-5 py-2 rounded-full mb-5 uppercase tracking-widest border border-[#003087]/20">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Rotary Year {president.year}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B2240] mb-3 tracking-tight leading-tight">
                {president.name}
              </h1>
              <p className="text-[#003087] font-bold text-lg uppercase tracking-widest mb-6">
                {president.designation}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-gray-50 rounded-xl px-6 py-3 border border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Service Initiatives</p>
                  <p className="text-2xl font-extrabold text-[#0B2240]">{presProjects.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Ledger Cards */}
        {hasBio && (
          <div className="grid md:grid-cols-2 gap-8">
            {president.bio.achievements && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#0B2240]">Tenure Vision &amp; Key Achievements</h2>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px]">{president.bio.achievements}</p>
              </div>
            )}
            {(president.bio.milestones || president.bio.projects) && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0079C1] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#0B2240]">Major Milestones &amp; Citations</h2>
                </div>
                {president.bio.milestones && (
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px] mb-4">{president.bio.milestones}</p>
                )}
                {president.bio.projects && (
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-[15px]">{president.bio.projects}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Linked Project Stream */}
        <div>
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#0B2240] mb-2">
              Service Initiatives Launched During This Leadership
            </h2>
            <p className="text-gray-500">Projects executed during the {president.year} Rotary term.</p>
          </div>
          {presProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {presProjects.map((project) => {
                const colorClass = CATEGORY_COLORS[project.category] || "bg-gray-100 text-gray-700";
                const hasProjectPhoto = project.photoURL && project.photoURL.trim() !== "";
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col"
                  >
                    <div className="relative h-52 bg-gray-100 overflow-hidden">
                      {hasProjectPhoto ? (
                        <Image
                          src={project.photoURL}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized={project.photoURL.startsWith("data:")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm ${colorClass}`}>
                        {project.category}
                      </div>
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-lg font-extrabold text-[#0B2240] mb-3 leading-tight">{project.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                        {project.shortDescription || project.description || "View this project for full details."}
                      </p>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                        <span className="text-[#0079C1] font-bold text-sm group-hover:underline">View Project</span>
                        <svg className="w-4 h-4 text-[#0079C1] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-400 font-medium">No tagged service initiatives found for the {president.year} term.</p>
              <p className="text-gray-300 text-sm mt-1">Projects can be tagged to this term from the Admin Dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}