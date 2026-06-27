"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  category: string;
  operatingYear: string;
  shortDescription: string;
  fullDetails: string;
  image?: string;
  photo?: string;
  imageUrl?: string;
  photoURL?: string; // Added photoURL field
  status?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 RAW PROJECT DATA ARRIVED FROM SERVER:", data);
        if (Array.isArray(data)) {
          setProjects(data.sort((a, b) => (b.id || 0) - (a.id || 0)));
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const uniqueYears = Array.from(
    new Set(projects.map((p) => p.operatingYear).filter(Boolean))
  ).sort((a, b) => b.localeCompare(a));

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesYear =
      selectedYear === "All" || project.operatingYear === selectedYear;
    return matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Titles */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B2240] tracking-tight mb-4">
            Our Service Initiatives
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore the historical timeline of projects driven by the Rotary Club of Amravati Ambika.
          </p>
        </div>

        {/* Filter Management Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 mb-10">
          <div className="flex flex-wrap gap-2">
            {["All", "Education", "Medical", "Other"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#0B2240] text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat === "All" ? "All Projects" : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="yearFilter" className="text-sm font-medium text-slate-600">
              Tenure Year:
            </label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-[#0B2240] focus:bg-white transition-all duration-200 min-w-[140px]"
            >
              <option value="All">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Matrix Display Section */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No matching projects found for the selected filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => {
              const projectImageSrc = project.photoURL || project.image || (project as any).photo || (project as any).imageUrl || (project as any).img;
              return (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
                >
                  {/* Image Display Holder */}
                  <div className="relative h-60 bg-gray-50 overflow-hidden">
                    {projectImageSrc ? (
                      <img
                        src={projectImageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                        <svg className="w-12 h-12 stroke-current" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#0B2240] shadow-sm uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Informational Summary Blocks */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-medium text-slate-400 mb-2">
                      Rotary Year {project.operatingYear || "N/A"}
                    </div>
                    <h3 className="font-bold text-xl text-[#0B2240] mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.shortDescription || "No overview summary layout available."}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-50 text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                      Read Narrative Details <span>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
