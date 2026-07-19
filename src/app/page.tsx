import Image from "next/image";
import Link from "next/link";
import SignatureProjectsMarquee from "@/components/SignatureProjectsMarquee";
import { getDb } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';


export default async function Home() {
  const db = await getDb();

  // ── Projects ────────────────────────────────────────────────────────────
  const rawProjects = await db.collection('projects').find({}).toArray();

  const processedProjects = (() => {
    if (!rawProjects || rawProjects.length === 0) return [];

    const pinnedProjects = rawProjects.filter((p: any) => p.pinned === true);
    if (pinnedProjects.length > 0) {
      return pinnedProjects.map((doc: any) => ({ ...doc, _id: doc._id?.toString() }));
    }

    // Fallback: 9 most recent projects
    const sorted = [...rawProjects].sort((a: any, b: any) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      if (!isNaN(timeA) && !isNaN(timeB) && (timeA !== 0 || timeB !== 0)) return timeB - timeA;
      return Number(b.id || 0) - Number(a.id || 0);
    });

    return sorted.slice(0, 9).map((doc: any) => ({ ...doc, _id: doc._id?.toString() }));
  })();

  // ── Upcoming Events (future dates only, sorted ascending) ───────────────
  const today = new Date().toISOString().split('T')[0];
  const eventsRaw = await db
    .collection('events')
    .find({ date: { $gte: today } })
    .sort({ date: 1 })
    .limit(3)
    .toArray();
  const events = eventsRaw.map((doc: any) => ({ ...doc, _id: doc._id?.toString() }));

  // ── Bulletins ────────────────────────────────────────────────────────────
  const bulletinsRaw = await db
    .collection('bulletins')
    .find({})
    .sort({ timestamp: -1 })
    .toArray();
  const bulletins = bulletinsRaw.map((doc: any) => ({ ...doc, _id: doc._id?.toString() }));

  const currentBulletin = bulletins.length > 0 ? bulletins[0] : null;
  const archivedBulletins = bulletins.slice(1, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-[48px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight">
            Service Above Self.<br />
            <span className="text-accent">Engineered for Local Impact.</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
            Rotary Club of Amravati Ambika &mdash; Moving Communities Forward through sustainable initiatives, vocational training, and dedicated leadership.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/board" className="btn-primary">
              View Active Board
            </Link>
            <button className="border-2 border-gray-200 text-primary font-semibold py-4 px-8 rounded-full hover:border-primary transition-colors">
              Download Weekly Bulletin
            </button>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-sm">
          <Image
            src="/hero.png"
            alt="Rotary Club of Amravati Ambika Official Group Photo"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </section>

      {/* Signature Projects */}
      <SignatureProjectsMarquee projects={processedProjects} />

      {/* Events & Archives */}
      <section className="max-w-[1280px] mx-auto px-6 py-32 grid md:grid-cols-2 gap-16">

        {/* Upcoming Events */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Upcoming Events</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover-interactive">
            {events.length > 0 ? events.map((event: any, idx: number) => {
              const d = new Date(event.date);
              const month = d.toLocaleString('default', { month: 'short' });
              const day = d.getDate().toString().padStart(2, '0');
              return (
                <div key={idx} className="p-8 border-b border-gray-100 flex gap-8">
                  <div className="text-center shrink-0">
                    <span className="block text-accent font-bold text-sm tracking-widest uppercase">{month}</span>
                    <span className="block text-4xl font-extrabold text-primary mt-1">{day}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.time}</p>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                </div>
              );
            }) : (
              <div className="p-8 text-center text-gray-500">No upcoming events scheduled.</div>
            )}
            <div className="p-6">
              <Link href="#" className="text-sm font-semibold text-accent flex items-center gap-2 hover:text-primary transition-colors">
                View Full Calendar &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Weekly Bulletin & Archives */}
        <div className="space-y-8">
          <div className="bg-[#0A1A30] rounded-2xl p-10 text-white shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Weekly Bulletin</h3>
            <p className="text-blue-200 text-sm mb-8">
              Stay updated with our latest projects and club news.{" "}
              {currentBulletin ? "Latest issue is out now." : "No bulletin available."}
            </p>
            {currentBulletin ? (
              <a
                href={currentBulletin.pdfBase64}
                download={currentBulletin.name}
                className="w-full bg-white text-[#0A1A30] font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Current Issue
              </a>
            ) : (
              <button disabled className="w-full bg-gray-600 text-gray-300 font-bold py-4 rounded-full flex items-center justify-center gap-2 cursor-not-allowed">
                No Issue Available
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover-interactive">
            <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">Recent Archives</h4>
            <div className="space-y-4">
              {archivedBulletins.length > 0 ? archivedBulletins.map((item: any, idx: number) => {
                const date = new Date(item.timestamp).toLocaleDateString();
                return (
                  <a
                    key={idx}
                    href={item.pdfBase64}
                    download={item.name}
                    className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-pale-blue transition-colors px-2 rounded-lg cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700">{date} - {item.name}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </a>
                );
              }) : (
                <div className="text-sm text-gray-500">No archived issues yet.</div>
              )}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
