import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { i18n } from "../../lib/i18n";
import { getTranslation } from "../../lib/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  // Traducciones para SEO
  const title = "MC World Compressor"; //getTranslation(locale, "seo.title", "MC World Compressor");
  const description = getTranslation(
    locale,
    "seo.description",
    "Compress your Minecraft Java worlds. Save space and improve the management of your worlds with our free and online compressor."
  );
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mcworldcompressor.vercel.app";
  const image = `${siteUrl}/assets/img/logo.webp`;
  const keywords = getTranslation(locale, "seo.keywords", [
    "compress minecraft world",
    "optimize minecraft world",
    "reduce minecraft size",
    "mc world compressor",
    "minecraft compressor online",
    "download compressed world",
    "minecraft java world",
  ]);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "MC World Compressor",
      images: [
        {
          url: image,
          width: 512,
          height: 512,
          alt: title,
        },
        {
          url: `${siteUrl}/assets/img/logo.webp`,
          width: 1200,
          height: 630,
          alt: `${title} - Banner`,
        },
      ],
      locale,
      type: "website",
      description,
      determiner: "the",
      emails: ["srkktua@protonmail.com"],
      site_name: "MC World Compressor",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@mcworldcompressor",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
      },
    },
    metadataBase: new URL(siteUrl),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale} className="h-full">
      <head>
        <title>MC World Compressor</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          type="image/webp"
          href="/assets/img/logo.webp"
          sizes="512x512"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/img/logo.webp"
          sizes="512x512"
        />
        <meta name="image" content="/assets/img/logo.webp" />
        <meta itemProp="image" content="/assets/img/logo.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white dark:bg-gray-900`}
      >
        <Navbar locale={locale} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
