import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import { getPageTranslations } from '@/lib/translations';

export default function Navbar({ locale = 'es' }) {
    const t = getPageTranslations(locale, 'nav');

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3 px-4 md:px-6">
            <div className="w-full flex items-center justify-between">
                <Link href={`/${locale}`} className="flex items-center">
                    <Image
                        src="/assets/img/logo.webp"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"/>
                    <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MC World Compressor</span>
                </Link>

                <div className="flex items-center gap-2">
                    <LanguageSelector locale={locale} />
                    
                    <Link
                        href={`/${locale}#faq`}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        FAQ
                    </Link>
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
