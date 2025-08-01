import Link from "next/link";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import { getPageTranslations } from "@/lib/translations";

export default function Navbar({ locale = "en" }) {
  const t = getPageTranslations(locale, "nav");

  console.log("Navbar locale:", locale);
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3 px-4 md:px-6">
      <div className="w-full flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/assets/img/logo.webp"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
            MC World Compressor
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <LanguageSelector locale={locale} />
            <Link
              href={`/${locale}#faq`}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <a
              href="https://github.com/MC-World-Compressor/"
              target="_blank"
              rel="noopener"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
          </div>
          <Link
            href={`/${locale}/upload`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            {t.compress}
          </Link>
        </div>
      </div>
    </nav>
  );
}
