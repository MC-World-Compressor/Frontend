'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function LanguageSelector({ locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!abierto) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [abierto]);

  const changeLanguage = (newLocale) => {
    setAbierto(false);
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
    <>
      <Head>
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="es" href="/es" />
        <link rel="alternate" hrefLang="hi" href="/hi" />
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </Head>
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center cursor-pointer"
          onClick={() => setAbierto((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={abierto}
        >
          {locale === 'es' ? (
            <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="Bandera de España">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#AA151B"/>
                <rect y="10" width="60" height="20" fill="#F1BF00"/>
              </svg>
            </span>
          ) : locale === 'hi' ? (
            <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="भारत का ध्वज">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#FF9933"/>
                <rect y="13.33" width="60" height="13.34" fill="#fff"/>
                <rect y="26.67" width="60" height="13.33" fill="#138808"/>
                <circle cx="30" cy="20" r="6" fill="#fff"/>
                <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1"/>
                <g stroke="#000080" strokeWidth="0.5">
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * 15) * Math.PI / 180;
                    const x1 = 30 + 0 * Math.cos(angle);
                    const y1 = 20 + 0 * Math.sin(angle);
                    const x2 = 30 + 5 * Math.cos(angle);
                    const y2 = 20 + 5 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>
                <circle cx="30" cy="20" r="1" fill="#000080"/>
              </svg>
            </span>
          ) : locale === 'ar' ? (
            <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="علم اليمن">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="13.33" y="0" fill="#ce1126"/>
                <rect width="60" height="13.33" y="13.33" fill="#fff"/>
                <rect width="60" height="13.34" y="26.66" fill="#000"/>
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
        <div
          className={`absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg transition-all duration-200 z-50
          ${abierto ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          style={{ pointerEvents: abierto ? 'auto' : 'none' }}
          role="listbox"
          tabIndex={-1}
        >
          {/* Inglés */}
          <button
            onClick={() => changeLanguage('en')}
            disabled={locale === 'en'}
            className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 rounded-t-md ${locale === 'en' ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            style={{ cursor: locale === 'en' ? 'not-allowed' : 'pointer' }}
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
          {/* Español */}
          <button
            onClick={() => changeLanguage('es')}
            disabled={locale === 'es'}
            className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${locale === 'es' ? '' : 'rounded-md'} ${locale === 'es' ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            style={{ cursor: locale === 'es' ? 'not-allowed' : 'pointer' }}
          >
            <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="Bandera de España">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#AA151B" rx="4"/>
                <rect y="10" width="60" height="20" fill="#F1BF00" rx="4"/>
              </svg>
            </span>
            Español
          </button>
          {/* Hindi */}
          <button
            onClick={() => changeLanguage('hi')}
            disabled={locale === 'hi'}
            className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${locale === 'hi' ? '' : 'rounded-md'} ${locale === 'hi' ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            style={{ cursor: locale === 'hi' ? 'not-allowed' : 'pointer' }}
          >
            <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="भारत का ध्वज">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="40" fill="#FF9933"/>
                <rect y="13.33" width="60" height="13.34" fill="#fff"/>
                <rect y="26.67" width="60" height="13.33" fill="#138808"/>
                <circle cx="30" cy="20" r="6" fill="#fff"/>
                <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1"/>
                <g stroke="#000080" strokeWidth="0.5">
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * 15) * Math.PI / 180;
                    const x1 = 30 + 0 * Math.cos(angle);
                    const y1 = 20 + 0 * Math.sin(angle);
                    const x2 = 30 + 5 * Math.cos(angle);
                    const y2 = 20 + 5 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>
                <circle cx="30" cy="20" r="1" fill="#000080"/>
              </svg>
            </span>
            हिंदी
          </button>
          {/* Árabe */}
          <button
            onClick={() => changeLanguage('ar')}
            disabled={locale === 'ar'}
            className={`block w-full text-left px-4 py-2 text-sm flex items-center gap-2 rounded-b-md ${locale === 'ar' ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            style={{ cursor: locale === 'ar' ? 'not-allowed' : 'pointer' }}
          >
            <span className="inline-block w-5 h-5 mr-2 align-middle mt-2" aria-label="علم اليمن">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="16">
                <rect width="60" height="13.33" y="0" fill="#ce1126"/>
                <rect width="60" height="13.33" y="13.33" fill="#fff"/>
                <rect width="60" height="13.34" y="26.66" fill="#000"/>
              </svg>
            </span>
            العربية
          </button>
        </div>
      </div>
    </>
  );
}
