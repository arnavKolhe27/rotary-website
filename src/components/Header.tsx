"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive 
      ? "text-primary border-b-2 border-primary pb-1 font-semibold" 
      : "hover:text-primary transition-colors pb-1 border-b-2 border-transparent";
  };

  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-4">
          <Image src={"/logo.png"} alt="Rotary Logo" width={48} height={48} className="h-10 w-auto md:h-12 object-contain" />
          <span className="font-extrabold text-[16px] text-primary uppercase tracking-wide">
            ROTARY CLUB OF AMRAVATI AMBIKA
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="/" className={getLinkClass("/")}>Home</Link>
          <Link href="/board" className={getLinkClass("/board")}>Active Board</Link>
          <Link href="/past-presidents" className={getLinkClass("/past-presidents")}>Past Presidents</Link>
          <Link href="/projects" className={getLinkClass("/projects")}>Projects</Link>
          <Link href="/donate" className={getLinkClass("/donate")}>Donate</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors hidden md:block">
            Portal Access
          </Link>
          <Link href="/contact" className="btn-primary py-2 px-6 text-sm hidden sm:block">
            Contact Us
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="block md:hidden text-[#0B2240] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col p-6 shadow-xl z-50 border-t border-slate-100 gap-4 text-left">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-[#0B2240] font-medium text-base py-2 border-b border-slate-50">Home</Link>
          <Link href="/board" onClick={() => setIsMenuOpen(false)} className="text-[#0B2240] font-medium text-base py-2 border-b border-slate-50">Active Board</Link>
          <Link href="/past-presidents" onClick={() => setIsMenuOpen(false)} className="text-[#0B2240] font-medium text-base py-2 border-b border-slate-50">Past Presidents</Link>
          <Link href="/projects" onClick={() => setIsMenuOpen(false)} className="text-[#0B2240] font-medium text-base py-2 border-b border-slate-50">Projects</Link>
          <Link href="/donate" onClick={() => setIsMenuOpen(false)} className="text-[#0B2240] font-medium text-base py-2 border-b border-slate-50">Donate</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-[#0B2240] font-medium text-base py-2 border-b border-slate-50">Contact Us</Link>
          
          {/* Portal Gate Link Enabled for Mobile Devices */}
          <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-blue-600 font-semibold text-base py-2 mt-2 flex items-center gap-2">
            🔐 Portal Access / Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}
