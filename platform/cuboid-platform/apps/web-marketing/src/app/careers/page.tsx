"use client";

import { Navigation, Footer } from "@/components";

const jobs = [
  { title: "Senior Backend Engineer", dept: "Engineering", location: "Lagos", type: "Full-time" },
  { title: "DevOps Engineer", dept: "Infrastructure", location: "Lagos", type: "Full-time" },
  { title: "Compliance Officer", dept: "Legal", location: "Lagos", type: "Full-time" },
  { title: "Product Manager", dept: "Product", location: "Lagos", type: "Full-time" }
];

export default function Careers() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[#6B8CFF] mb-6">CAREERS</div>
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] leading-[1.05] max-w-[20ch] mb-6">Join our mission</h1>
          <p className="text-[18px] text-[rgba(255,255,255,0.82)] max-w-[32ch] mb-16">Help us build the future of African institutional finance.</p>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="glass-panel p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[rgba(255,255,255,0.96)] mb-2">{job.title}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.62)]">{job.dept} · {job.location} · {job.type}</p>
                </div>
                <button className="h-[48px] px-6 bg-transparent border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.82)] rounded-[14px] font-medium hover:bg-[rgba(255,255,255,0.04)] transition-all">Apply</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}