"use client";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">D</span>
        </div>
        <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight">
          DAO Governance
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
          Dashboard
        </Link>
        {/* The ConnectKitButton handles the entire login flow automatically */}
        <ConnectKitButton />
      </div>
    </nav>
  );
}