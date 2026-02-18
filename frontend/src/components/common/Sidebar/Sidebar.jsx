"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusSquare,
  User,
  Compass,
  Menu,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";



export default function Sidebar() {
  const pathname = usePathname();
  const { user, handleLogout } = useAuth();

  
  const navlinks = [
    {
      name: "home",
      path: "/",
      isauth: true,
      btn: false,
      icon: Home
    },
    {
      name: "Create",
      path: "/createpost",
      isauth: true,
      btn: false,
      icon: PlusSquare
    },
    {
      name: "Explore",
      path: "/explore",
      isauth: true,
      btn: false,
      icon: Compass
    },
    {
      name: "Notification",
      path: "/notification",
      isauth: true,
      btn: false,
      icon: Bell
    },
    {
      name: "profile",
      path: "/profile",
      isauth: true,
      btn: false,
      icon: User
    },
    {
      name: "login",
      path: "/login",
      isauth: false,
      btn: false,
      icon: User

    },
    {
      name: "register",
      path: "/register",
      isauth: false,
      btn: true,
      icon: User

    },
  ];
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r bg-white dark:bg-black dark:border-neutral-800 flex flex-col justify-between px-3 py-6">

      <div>
        <h1 className="text-2xl font-bold px-3 mb-8">
          Next<span className="">Social</span>
        </h1>

        <nav className="flex flex-col gap-2">
          {navlinks.map((item, idx) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            if (item.isauth && user) {
              return (
                <>
                  <Link
                    key={idx}
                    href={item.path}
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg transition
                  ${active
                        ? "bg-gray-200 dark:bg-neutral-800 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-900"
                      }`}
                  >
                    <Icon size={22} />
                    <span>{item.name}</span>
                  </Link>
                </>
              )
            } else if (!item.isauth && !user) {
              return (
                <>
                  <Link
                    key={idx}
                    href={item.path}
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg transition
                  ${active
                        ? "bg-gray-200 dark:bg-neutral-800 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-900"
                      }`}
                  >
                    <Icon size={22} />
                    <span>{item.name}</span>
                  </Link>
                </>
              )
            }
          })}
          {user && (
            <button onClick={handleLogout} className="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition">
              Logout
            </button>
          )}
        </nav>
      </div>

      <button
        className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition"
      >
        <Menu size={22} />
        <span>More</span>
      </button>

    </aside>
  );
}
