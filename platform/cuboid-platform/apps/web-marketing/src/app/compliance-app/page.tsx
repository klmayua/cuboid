"use client";

import { Navigation } from "@/components";

const checks = [
  { entity: "Acme Corp", type: "KYC", status: "approved", date: "2026-05-07" },
  { entity: "Global Trade Ltd", type: "AML", status: "pending", date: "2026-05-07" },
  { entity: "AfriTech Solutions", type: "KYC", status: "review", date: "2026-05-06" }
];

export default function ComplianceApp() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Compliance Center</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Manage compliance and regulatory requirements</p>
          <div className="glass-panel p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Entity</th>
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Check Type</th>
                  <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Status</th>
                  <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Date</th>
                </tr>
              </thead>
              <tbody>
                {checks.map((c, i) => (
                  <tr key={i} className="border-b border-[rgba(255,255,255,0.08)]">
                    <td className="py-4 text-[rgba(255,255,255,0.96)]">{c.entity}</td>
                    <td className="py-4 text-[rgba(255,255,255,0.82)]">{c.type}</td>
                    <td className={`py-4 text-right ${c.status === "approved" ? "text-[#71F8E4]" : c.status === "pending" ? "text-[#E9C349]" : "text-[#6B8CFF]"}`}>{c.status}</td>
                    <td className="py-4 text-right text-[rgba(255,255,255,0.62)]">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}