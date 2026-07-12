"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';


const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Education: {
    label: "Education",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  Medical: {
    label: "Medical",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  "Other Initiatives": {
    label: "Other Initiatives",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
};

export default function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: any[]) => {
        const found = data.find((p) => p.id === id);
        setProject(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#003087] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-semibold">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold text-gray-700">Project not found.</p>
        <button
          onClick={() => router.push("/projects")}
          className="px-8 py-3 bg-[#003087] text-white font-bold rounded-full hover:bg-[#0B2240] transition-colors"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const catConfig = CATEGORY_CONFIG[project.category] || {
    label: project.category || "Initiative",
    color: "text-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-200",
  };
  const hasPhoto = project.photoURL && project.photoURL.trim() !== "";
  const teaser = project.shortDescription || project.description || "";
  const fullNarrative = project.fullDetails || project.description || "";

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sticky breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center gap-2 text-sm font-bold text-[#003087] hover:text-[#0B2240] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Projects
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500 font-medium truncate">{project.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-[55vh] min-h-[340px] max-h-[500px] bg-[#0B2240] overflow-hidden">
        {hasPhoto ? (
          <>
            <Image
              src={project.photoURL}
              alt={project.title}
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
              unoptimized={project.photoURL.startsWith("data:")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240] via-[#0B2240]/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2240] via-[#003087] to-[#0079C1]">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        )}

        {/* Hero content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${catConfig.bg} ${catConfig.color} ${catConfig.border}`}>
                {catConfig.label}
              </span>
              {project.operatingYear && (
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-widest">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Rotary Year {project.operatingYear}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              {project.title}
            </h1>
            {teaser && (
              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                {teaser}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">

        {/* Full Narrative */}
        {fullNarrative && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-[#0B2240]">Project Narrative</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              {fullNarrative.split("\n\n").map((para: string, i: number) =>
                para.trim() ? (
                  <p key={i} className="text-gray-700 leading-relaxed text-base md:text-lg mb-5">
                    {para.trim()}
                  </p>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Meta info strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Category</p>
            <p className={`font-extrabold text-lg ${catConfig.color}`}>{project.category || "—"}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Rotary Year</p>
            <p className="font-extrabold text-lg text-[#0B2240]">{project.operatingYear || "—"}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center col-span-2 md:col-span-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Status</p>
            <p className="font-extrabold text-lg text-emerald-600">Completed</p>
          </div>
        </div>

        {/* CTA footer */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#003087] text-[#003087] font-bold rounded-full hover:bg-[#003087] hover:text-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            All Projects
          </Link>
          <Link
            href="/donate"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#0079C1] text-white font-bold rounded-full hover:bg-[#003087] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Support Future Initiatives
          </Link>
        </div>
      </div>
    </div>
  );
}