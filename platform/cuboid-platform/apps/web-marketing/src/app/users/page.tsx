"use client";

import { Navigation } from "@/components";

const users = [
  { name: "John Doe", email: "john@acmecorp.com", role: "Admin", status: "active" },
  { name: "Jane Smith", email: "jane@acmecorp.com", role: "Treasury", status: "active" },
  { name: "Bob Wilson", email: "bob@acmecorp.com", role: "Viewer", status: "pending" }
];

export default function Users() {
  return (
    <main className="min-h-screen bg-[#060D20]">
      <Navigation />
      <section className="pt-[96px]">
        <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
          <h1 className="text-[40px] font-bold text-[rgba(255,255,255,0.96)] mb-2">User Management</h1>
          <p className="text-[rgba(255,255,255,0.62)] mb-8">Manage users and permissions</p>
          <div className="glass-panel p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Name</th>
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Email</th>
                  <th className="text-left py-3 text-[rgba(255,255,255,0.62)]">Role</th>
                  <th className="text-right py-3 text-[rgba(255,255,255,0.62)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-b border-[rgba(255,255,255,0.08)]">
                    <td className="py-4 text-[rgba(255,255,255,0.96)]">{u.name}</td>
                    <td className="py-4 text-[rgba(255,255,255,0.82)]">{u.email}</td>
                    <td className="py-4 text-[rgba(255,255,255,0.82)]">{u.role}</td>
                    <td className={`py-4 text-right ${u.status === "active" ? "text-[#71F8E4]" : "text-[#E9C349]"}`}>{u.status}</td>
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