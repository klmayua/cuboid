import { AppSidebar } from '@/components/AppSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <AppSidebar />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}