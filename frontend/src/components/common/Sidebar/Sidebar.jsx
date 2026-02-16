"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusSquare,
  User,
  Compass,
  Menu,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create", href: "/create", icon: PlusSquare },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Profile", href: "/profile", icon: User },
  { name: "register", href: "/register", icon: User },
  { name: "Login", href: "/login", icon: User },

];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r bg-white dark:bg-black dark:border-neutral-800 flex flex-col justify-between px-3 py-6">

      {/* 🔝 Top Logo */}
      <div>
        <h1 className="text-2xl font-bold px-3 mb-8">
          Next<span className="">Social</span>
        </h1>

        {/* 🔹 Center Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-3 py-2 rounded-lg transition
                  ${
                    active
                      ? "bg-gray-200 dark:bg-neutral-800 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-neutral-900"
                  }`}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 🔻 Bottom More */}
      <button
        className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition"
      >
        <Menu size={22} />
        <span>More</span>
      </button>

    </aside>
  );
}
