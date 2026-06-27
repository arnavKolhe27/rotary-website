"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignatureProjectsMarquee({ projects }: { projects: any[] }) {
  const validProjects = projects && projects.length > 0 ? projects : [
    { id: 1, photoURL: "/proj1.png", title: "Document Mockup" },
    { id: 2, photoURL: "/proj2.png", title: "Office Space" },
    { id: 3, photoURL: "/proj3.png", title: "Warehouse Supplies" },
    { id: 4, photoURL: "/proj4.png", title: "Park Pathway" },
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number>(0);



  return (
    <section 
      className="py-32 bg-soft-gray overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1280px] mx-auto px-6 mb-12 flex justify-between items-end">
        <h2 className="text-4xl font-extrabold tracking-tight text-primary">
          Signature Projects
        </h2>
        <Link href="/projects" className="text-primary font-bold text-lg hover:underline transition-all">
          More Projects &rarr;
        </Link>
      </div>
      
      <div className="w-full relative" ref={containerRef}>
        <div 
          ref={trackRef}
          className="flex gap-6 px-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 scrollbar-none"
        >
          {validProjects.map((project, idx) => (
            <Link
              key={`${project.id}-${idx}`}
              href={project.id && typeof project.id === 'string' && project.id.length > 3 ? `/projects/${project.id}` : '/projects'}
              className="snap-center min-w-[85%] sm:min-w-[60%] md:min-w-0 md:w-full flex-shrink-0 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative shadow-sm hover-interactive group block"
            >
              <Image
                src={project.photoURL && project.photoURL.length > 0 ? project.photoURL : "/window.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized={!!(project.photoURL && project.photoURL.startsWith('data:'))}
              />
              {project.category && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {project.category}
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-[#0B2240]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-7">
                <p className="text-white font-extrabold text-xl mb-2 leading-tight">{project.title}</p>
                {(project.shortDescription || project.description) && (
                  <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.shortDescription || project.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-[#0079C1] bg-white font-bold text-xs px-4 py-2 rounded-full w-fit">
                  Read More &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
