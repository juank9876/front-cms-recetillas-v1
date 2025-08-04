'use client'

import { SiteSettings } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  siteSettings?: SiteSettings | null;
}

export function Logo({ siteSettings }: LogoProps) {
  // Fallback values if API fails or no settings provided
  const site_title = siteSettings?.site_title || "Recetillas";
  const site_logo = siteSettings?.site_logo;

  // Get first letter of title for fallback
  const firstLetter = site_title.charAt(0).toUpperCase();

  return (
    <Link
      href="/"
      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
    >
      {site_logo ? (
        <Image
          alt={site_title || "Site logo"}
          src={site_logo}
          width={120}
          height={40}
          className="h-10 w-auto object-contain"
        />
      ) : (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">{firstLetter}</span>
          </div>
          <span className="text-xl font-bold text-orange-600 tracking-tight">
            {site_title}
          </span>
        </div>
      )}
    </Link>
  );
}
