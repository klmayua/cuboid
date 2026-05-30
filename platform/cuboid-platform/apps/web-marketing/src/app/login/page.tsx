"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  useEffect(() => { router.replace("/signin"); }, [router]);
  return (
    <main className="min-h-screen bg-[#07111A] flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-[#00A86B]" />
    </main>
  );
}
