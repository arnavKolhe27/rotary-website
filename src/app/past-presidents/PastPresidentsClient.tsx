"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Member } from "@/lib/db";
import FallbackAvatar from "@/components/FallbackAvatar";

function BioModal({ member, onClose }: { member: Member, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {/* Left Column: Image */}
        <div className="w-full md:w-2/5 bg-gray-50 relative aspect-square md:aspect-auto shrink-0">
          {member.photoURL ? (
            <Image 
              src={member.photoURL} 
              alt={member.name} 
              fill 
              className="object-cover"
            />
          ) : (
            <FallbackAvatar className="w-full h-full" />
          )}
        </div>

        {/* Right Column: Text Blocks */}
        <div className="p-10 md:p-12 w-full md:w-3/5 overflow-y-auto max-h-[80vh]">
          <h2 className="text-3xl font-extrabold text-primary mb-2">{member.name}</h2>
          <p className="text-accent font-semibold tracking-wider uppercase mb-8">President {member.year}</p>

          <div className="space-y-8">
            {member.bio.achievements && (
              <div>
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">Key Achievements</h3>
                <p className="text-gray-700 leading-relaxed">{member.bio.achievements}</p>
              </div>
            )}
            {member.bio.projects && (
              <div>
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">Major Projects</h3>
                <p className="text-gray-700 leading-relaxed">{member.bio.projects}</p>
              </div>
            )}
            {member.bio.milestones && (
              <div>
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">Milestones</h3>
                <p className="text-gray-700 leading-relaxed">{member.bio.milestones}</p>
              </div>
            )}
          </div>
          {/* Link to full dynamic portfolio page */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <Link
              href={`/past-presidents/${member.id}`}
              className="inline-flex items-center gap-2 bg-[#003087] text-white font-bold px-6 py-3 rounded-full hover:bg-[#0B2240] transition-colors text-sm"
            >
              View Full Profile &amp; Legacy Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PastPresidentsClient({ members }: { members: Member[] }) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {members.map(member => (
          <div 
            key={member.id}
            className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col group"
            onClick={() => setSelectedMember(member)}
          >
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              {member.photoURL ? (
                <Image 
                  src={member.photoURL} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <FallbackAvatar className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
              )}
            </div>
            <div className="p-5 text-center bg-white flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-gray-500">{member.year}</p>
            </div>
          </div>
        ))}
      </div>
      {members.length === 0 && (
        <div className="text-center text-gray-500 py-12">No historical records found.</div>
      )}

      {selectedMember && (
        <BioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </>
  );
}
