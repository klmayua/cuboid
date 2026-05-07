import { Navigation } from "@/components";
export default function RegulatorAudit() {
  return <main className="min-h-screen bg-[#060D20]"><Navigation /><section className="pt-[96px]"><div className="max-w-[1600px] mx-auto px-[80px] py-[140px]"><h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">Audit Exports</h1><p className="text-[rgba(255,255,255,0.62)] mb-8">Export audit data</p><div className="glass-panel p-6"><button className="h-[48px] px-6 bg-[#6B8CFF] text-white rounded-[14px] font-medium">Export All</button></div></div></section></main>;
}