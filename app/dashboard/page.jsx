import Link from 'next/link';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { AdminPanel } from '@/components/AdminPanel';
import { SettingsPanel } from '@/components/SettingsPanel';

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold">
          <LayoutDashboard size={24} className="text-whatsapp" /> Panel de Control
        </h1>
        <Link
          href="/"
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
      </div>
      <AdminPanel />
      <SettingsPanel />
    </div>
  );
}
