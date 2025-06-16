import { headers } from 'next/headers';
import { getPageTranslations } from '@/lib/translations';
import { i18n } from '@/lib/i18n';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import Link from 'next/link';

async function getLocaleFromHeaders() {
  const h = await headers();
  const locale = h.get('x-path-locale');
  if (i18n.locales.includes(locale)) return locale;
  return i18n.defaultLocale;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mcworldcompressor.vercel.app';
export const metadata = {
  title: "Minecraft World Compressor",
  description: "Compress your Minecraft Java worlds. Save space and improve the management of your worlds with our free and online compressor.",
  keywords: [
    "compress minecraft world",
    "optimize minecraft world",
    "reduce minecraft size",
    "mc world compressor",
    "minecraft compressor online",
    "download compressed world",
    "minecraft java world"
  ],
  openGraph: {
    title: "Minecraft World Compressor",
    description: "Compress your Minecraft Java worlds. Save space and improve the management of your worlds with our free and online compressor.",
    url: siteUrl,
    siteName: "MC World Compressor",
    images: [
      {
        url: `${siteUrl}/assets/img/logo.webp`,
        width: 512,
        height: 512,
        alt: "Minecraft World Compressor",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minecraft World Compressor",
    description: "Compress your Minecraft Java worlds. Save space and improve the management of your worlds with our free and online compressor.",
    images: [`${siteUrl}/assets/img/logo.webp`],
  },
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      es: `${siteUrl}/es`,
      en: `${siteUrl}/en`,
    },
  },
};

const ContactInfo = ({ t, locale }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 max-w-lg mx-auto shadow-lg backdrop-blur-sm">
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3">{t.contactUs}:</h4>
      <div className="flex items-center">
        <svg className="h-4 w-4 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        <a href="mailto:srkktua@protonmail.com?subject=MCWCompressor%Help" className="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 hover:underline transition-colors">
          srkktua@protonmail.com
        </a>
      </div>
      <div className="flex items-center">
        <svg className="h-4 w-4 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
        </svg>
        <a href="https://discord.com/users/529736520048050189" target="_blank" className="text-sm text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 hover:underline transition-colors">
          Discord: @papela
        </a>
      </div>
      <div className="flex items-center">
        <svg className="h-4 w-4 mr-3 text-gray-600 dark:text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
        </svg>
        <a href="https://github.com/MC-World-Compressor/Frontend" target="_blank" className="text-sm text-indigo-800 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 hover:underline transition-colors">
          GitHub
        </a>
      </div>
    </div>
  </div>
);

const HelpfulLinks = ({ t, locale }) => {
  const links = [
    {
      title: t.mainTitle,
      description: t.mainDescription,
      href: `/${locale}`,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: t.faqTitle,
      description: t.faqDescription,
      href: `/${locale}#faq`,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t.uploadWorldTitle,
      description: t.uploadWorldDescription,
      href: `/${locale}/upload`,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    }
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
              <div className="text-blue-600 dark:text-blue-400">
                {link.icon}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {link.title}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {link.description}
          </p>
        </Link>
      ))}
    </div>
  );
};



export default async function NotFound() {
  const locale = await getLocaleFromHeaders();
  const t = getPageTranslations(locale, 'notFound');

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Navbar locale={locale} />
        <div className="min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-grow flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              {/* Error Code Display */}
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 select-none leading-none">
                404
              </h1>
              {/* Main Content */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                  {t.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                >
                  <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t.goHome}
                </Link>
                
                <BackButton
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300/50 dark:focus:ring-gray-700/50 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.goBack}
                </BackButton>
              </div>
            </div>
          </div>

          {/* Helpful Links Section */}
          <div className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t.needHelp}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                  {t.helpDescription}
                </p>
              </div>
              
              <HelpfulLinks t={t} locale={locale} />
            </div>
          </div>

          {/* Contact Section */}
          <div className="py-16 px-4 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t.stillNeedHelp}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                  {t.stillNeedHelpDescription}
                </p>
              </div>
              
              <ContactInfo t={t} locale={locale} />
            </div>
          </div>
        </div>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
