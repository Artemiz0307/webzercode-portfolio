import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PageLoader from "@/components/PageLoader"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://webzercode.vercel.app"),

  title: {
    default: "WebzerCode | Full Stack & AI Developer",
    template: "%s | WebzerCode",
  },

  description:
    "WebzerCode builds scalable web applications, AI systems, and modern digital platforms. Portfolio of full-stack development, machine learning projects, and SaaS engineering.",

  keywords: [
    "WebzerCode",
    "Full Stack Developer",
    "AI Developer",
    "Machine Learning Projects",
    "Next.js Portfolio",
    "React Developer",
    "SaaS Development",
  ],

  authors: [
    {
      name: "WebzerCode",
    },
  ],

  openGraph: {
    title: "WebzerCode | Full Stack & AI Developer",
    description:
      "Portfolio showcasing AI systems, scalable web apps, and modern SaaS development.",
    url: "https://webzercode.vercel.app",
    siteName: "WebzerCode",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebzerCode Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WebzerCode | Full Stack & AI Developer",
    description:
      "Portfolio showcasing AI systems, scalable web apps, and modern SaaS development.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
  suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white transition-colors duration-300`}
>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <PageLoader>
          {children}
        </PageLoader>
      </ThemeProvider>
      </body>
    </html>
  )
}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "WebzerCode",
      url: "https://webzercode.vercel.app",
      jobTitle: "Full Stack & AI Developer",
    }),
  }}
/>