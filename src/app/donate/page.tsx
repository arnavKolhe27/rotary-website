"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DonatePage() {
  const [donationData, setDonationData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/donation")
      .then(res => res.json())
      .then(data => setDonationData(data));
  }, []);

  if (!donationData) {
    return <div className="min-h-[60vh] flex items-center justify-center text-primary font-bold">Loading...</div>;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-24 md:py-32">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-12 tracking-tight">Support Our Initiatives. Fuel Sustainable Local Change.</h1>
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
          <p>
            Your generous contributions empower the Rotary Club of Amravati Ambika to continue delivering impactful projects across healthcare, education, and community development. 
          </p>
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-primary mb-4">How Your Funds Are Utilized:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>100% Direct Impact:</strong> All donations go directly to our active community projects.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Zero Overhead:</strong> Administrative costs are covered strictly by member dues, not your donations.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span><strong>Tax Exemptions:</strong> Eligible donations receive tax exemption certificates under section 80G.</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-slate-100 p-8 md:p-10 rounded-3xl border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 border-b border-slate-300 pb-4">Bank Details for Direct Transfers</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">Bank Name</p>
                <p className="text-xl font-semibold text-navy-900">{donationData.bankName}</p>
              </div>
              <div>
                <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">Account Name</p>
                <p className="text-xl font-semibold text-navy-900">{donationData.accountName}</p>
              </div>
              <div>
                <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">Account Number</p>
                <p className="text-2xl font-mono text-primary tracking-wider">{donationData.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">IFSC Code</p>
                <p className="text-xl font-semibold text-navy-900">{donationData.ifscCode}</p>
              </div>
              {donationData.qrCodeBase64 && (
                <div className="pt-6 border-t border-slate-300">
                  <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4 text-center">Scan to Pay</p>
                  <div className="bg-white p-4 rounded-xl mx-auto w-[200px] h-[200px] flex items-center justify-center shadow-sm">
                    <Image src={donationData.qrCodeBase64} alt="Donation QR Code" width={180} height={180} className="object-contain" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
