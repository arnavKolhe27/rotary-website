"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive 
      ? "text-primary border-b-2 border-primary pb-1 font-semibold" 
      : "hover:text-primary transition-colors pb-1 border-b-2 border-transparent";
  };

  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image src={"/logo.png"} alt="Rotary Logo" width={48} height={48} className="h-10 w-auto md:h-12 object-contain" />
          <span className="font-extrabold text-[16px] text-primary uppercase tracking-wide">
            ROTARY CLUB OF AMRAVATI AMBIKA
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="/" className={getLinkClass("/")}>Home</Link>
          <Link href="/board" className={getLinkClass("/board")}>Active Board</Link>
          <Link href="/past-presidents" className={getLinkClass("/past-presidents")}>Past Presidents</Link>
          <Link href="/projects" className={getLinkClass("/projects")}>Projects</Link>
          <Link href="/donate" className={getLinkClass("/donate")}>Donate</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors hidden sm:block">
            Portal Access
          </Link>
          <Link href="/contact" className="btn-primary py-2 px-6 text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
