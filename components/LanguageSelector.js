'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSelector({ locale }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const changeLanguage = (newLocale) => {
    if (newLocale === locale) return;
    let newPathname;
    if (/^\/[a-z]{2}(\/|$)/.test(pathname)) {
      newPathname = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${newLocale}`);
    } else {
      newPathname = `/${newLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    }
    router.push(newPathname);
  };
  
  return (
    <div className="relative group">
      <button className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center">
        {locale === 'es' ? (
          <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="Bandera de España">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
              <rect width="60" height="40" fill="#AA151B"/>
              <rect y="10" width="60" height="20" fill="#F1BF00"/>
            </svg>
          </span>
        ) : (
          <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="USA flag">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
              <rect width="60" height="40" fill="#B22234"/>
              <g>
                <rect y="3.08" width="60" height="3.08" fill="#fff"/>
                <rect y="9.24" width="60" height="3.08" fill="#fff"/>
                <rect y="15.4" width="60" height="3.08" fill="#fff"/>
                <rect y="21.56" width="60" height="3.08" fill="#fff"/>
                <rect y="27.72" width="60" height="3.08" fill="#fff"/>
                <rect y="33.88" width="60" height="3.08" fill="#fff"/>
              </g>
              <rect width="24" height="17.6" fill="#3C3B6E"/>
              <g fill="#fff">
                <g id="s18">
                  <g id="s9">
                    <g id="s5">
                      <polygon points="2.4,2.6 3,4.2 1.2,3.2 3.6,3.2 1.8,4.2"/>
                      <use href="#s5" x="4.8"/>
                      <use href="#s5" x="9.6"/>
                      <use href="#s5" x="14.4"/>
                      <use href="#s5" x="19.2"/>
                    </g>
                    <use href="#s5" y="3.52"/>
                  </g>
                  <use href="#s9" y="7.04"/>
                </g>
                <use href="#s18" x="2.4" y="1.76"/>
              </g>
            </svg>
          </span>
        )}
        {locale.toUpperCase()}
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => changeLanguage('es')}
          disabled={locale === 'es'}
          className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 rounded-t-md ${locale === 'es' ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="Bandera de España">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
              <rect width="60" height="40" fill="#AA151B" rx="4"/>
              <rect y="10" width="60" height="20" fill="#F1BF00" rx="4"/>
            </svg>
          </span>
          Español
        </button>
        <button
          onClick={() => changeLanguage('en')}
          disabled={locale === 'en'}
          className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 rounded-b-md ${locale === 'en' ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="USA flag">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
              <rect width="60" height="40" fill="#B22234" rx="4"/>
              <g>
                <rect y="3.08" width="60" height="3.08" fill="#fff"/>
                <rect y="9.24" width="60" height="3.08" fill="#fff"/>
                <rect y="15.4" width="60" height="3.08" fill="#fff"/>
                <rect y="21.56" width="60" height="3.08" fill="#fff"/>
                <rect y="27.72" width="60" height="3.08" fill="#fff"/>
                <rect y="33.88" width="60" height="3.08" fill="#fff"/>
              </g>
              <rect width="24" height="17.6" fill="#3C3B6E" rx="2"/>
              <g fill="#fff">
                <g id="s18">
                  <g id="s9">
                    <g id="s5">
                      <polygon points="2.4,2.6 3,4.2 1.2,3.2 3.6,3.2 1.8,4.2"/>
                      <use href="#s5" x="4.8"/>
                      <use href="#s5" x="9.6"/>
                      <use href="#s5" x="14.4"/>
                      <use href="#s5" x="19.2"/>
                    </g>
                    <use href="#s5" y="3.52"/>
                  </g>
                  <use href="#s9" y="7.04"/>
                </g>
                <use href="#s18" x="2.4" y="1.76"/>
              </g>
            </svg>
          </span>
          English
        </button>
      </div>
    </div>
  );
}
