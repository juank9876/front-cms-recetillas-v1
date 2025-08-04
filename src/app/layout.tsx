import "./globals.css";
import { generateFonts } from '../utils/fonts'
import { Footer } from "@/components/juankui/wrappers/footer";
import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { ViewTransitions } from 'next-view-transitions'
import { hexToOklch } from "@/utils/hex-to-oklch";
import { Providers } from "./providers";
import { Header } from "@/components/juankui/wrappers/header/header";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()

  return {
    title: settings.site_title,
    description: settings.site_description,
    keywords: settings.meta_keywords,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),

    // OpenGraph metadata
    openGraph: {
      title: settings.meta_title || settings.site_title,
      description: settings.meta_description || settings.site_description,
      type: 'website',
      siteName: settings.site_title,
    },

    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: settings.meta_title || settings.site_title,
      description: settings.meta_description || settings.site_description,
    },

    icons: [
      {
        rel: "icon",
        url: settings.favicon || "/favicon.svg",
        sizes: "32x32",
        type: "image/png"
      }
    ],

    // Additional metadata
    other: {
      'google-analytics': settings.ga_tracking_id || '',
      'facebook-pixel': settings.facebook_pixel || '',
      'custom-css': settings.custom_css || '',
      'custom-js': settings.custom_js || '',
    }
  }
}


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const font = await generateFonts();
  const settings = await fetchSiteSettings()

  const primaryLightColor = "#ffffff"
  const secondaryLightColor = hexToOklch(settings.secondary_color, 0.80);
  const accentLightColor = hexToOklch(settings.accent_color, 0.80);

  const primarySemiDarkColor = hexToOklch(settings.primary_color, 0.3, 'darker')
  const primaryDarkColor = hexToOklch(settings.primary_color, 0.4, 'darker')

  const secondaryDarkColor = hexToOklch(settings.secondary_color, 0.2, 'darker');
  const accentDarkColor = hexToOklch(settings.accent_color, 0.2, 'darker');

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={`${font.variable} font-sans`}>
        <body
          style={{
            '--color-primary': settings.primary_color,
            '--color-secondary': settings.secondary_color,
            '--color-accent': settings.accent_color,

            '--color-primary-light': primaryLightColor,
            '--color-secondary-light': secondaryLightColor,
            '--color-accent-light': accentLightColor,

            '--color-primary-semi-dark': primarySemiDarkColor,
            '--color-primary-dark': primaryDarkColor,
            '--color-secondary-dark': secondaryDarkColor,
            '--color-accent-dark': accentDarkColor,

          } as React.CSSProperties
          }
          className={`max-w-screen bg-white antialiased`}
          suppressHydrationWarning
        >
          <Providers>
            <div className="flex min-h-[100dvh] flex-col">
              <Header />
              {children}
              <Footer settings={settings} />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
