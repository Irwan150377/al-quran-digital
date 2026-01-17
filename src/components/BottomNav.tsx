"use client";

import { BookOpen, Clock, BookHeart, Trophy, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/quran", icon: BookOpen, label: "Al-Quran" },
  { href: "/audio", icon: BookHeart, label: "Ma'tsurat" },
  { href: "/prayer", icon: Clock, label: "Sholat" },
  { href: "/quiz", icon: Trophy, label: "Kuis" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive
                  ? "text-[#1ABC9C]"
                  : "text-gray-500 hover:text-[#1ABC9C]"
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
