"use client";

import { BookOpen, Headphones, Clock, Trophy } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    href: "/quran",
    icon: BookOpen,
    label: "Baca",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    href: "/audio",
    icon: Headphones,
    label: "Dengar",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    href: "/prayer",
    icon: Clock,
    label: "Sholat",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    href: "/quiz",
    icon: Trophy,
    label: "Kuis",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:scale-105 transition-transform"
        >
          <div className={`p-3 rounded-full ${action.color}`}>
            <action.icon size={24} />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
