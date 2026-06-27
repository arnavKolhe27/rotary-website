import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-gray-400 py-16 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="font-extrabold text-xl text-white uppercase tracking-wide max-w-[250px]">
          ROTARY CLUB OF AMRAVATI AMBIKA
        </div>
        <div className="flex gap-8 text-sm">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="https://www.rotary.org" className="hover:text-white transition-colors">Rotary International</Link>
          <span className="hover:text-white transition-colors">District 3030</span>
        </div>
        <div className="text-sm text-right flex flex-col items-end gap-2">
          <span>&copy; 2026 Rotary Club of Amravati Ambika. All rights reserved.</span>
          <span>Rotary International District 3030.</span>
          {/* Secret Login Bridge */}
          <Link href="/admin" className="text-xs text-gray-600 hover:text-gray-400 mt-2 transition-colors">
            Portal Access
          </Link>
        </div>
      </div>
    </footer>
  );
}
