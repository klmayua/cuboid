"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function getCookie(n: string) { const m = document.cookie.match(new RegExp(`(^| )${n}=([^;]+)`)); return m ? decodeURIComponent(m[2]) : ""; }

const ROLE_ROUTES: Record<string, string> = {
  "Partner": "/dashboard/partner",
  "Broker": "/dashboard/partner",
  "Super Admin": "/dashboard/admin",
  "Operations": "/dashboard/admin",
  "Ops Control": "/dashboard/admin",
  "Operations Manager": "/dashboard/admin",
  "BDC Operator": "/dashboard/bdc",
  "Treasury": "/dashboard/treasury",
  "Analyst": "/dashboard/analyst",
  "Data Analyst": "/dashboard/analyst",
  "Customer": "/dashboard/customer",
  "User": "/dashboard/customer",
};

export default function DashboardRoot() {
  const router = useRouter();

  useEffect(() => {
    const role = getCookie("cuboid-demo-role");
    if (!role) { router.replace("/signin"); return; }
    const route = ROLE_ROUTES[role] || "/dashboard/customer";
    router.replace(route);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#07111A] flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={32} className="animate-spin text-[#D4AF37] mx-auto mb-4" />
        <p className="text-sm text-[#94A3B8]">Loading workspace...</p>
      </div>
    </main>
  );
}
