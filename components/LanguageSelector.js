import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import FlagES from './icons/FlagES';
import FlagEN from './icons/FlagEN';
import FlagHI from './icons/FlagHI';
import FlagAR from './icons/FlagAR';

const FLAGS = {
  es: FlagES,
  en: FlagEN,
  hi: FlagHI,
  ar: FlagAR
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ar', label: 'العربية' }
];

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
    router.push(newPathname, { scroll: false });
  };

  const CurrentFlag = FLAGS[locale] || FlagEN;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:white transition-colors flex items-center cursor-pointer"
        onClick={() => setAbierto((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
      >
        <CurrentFlag className="w-5 h-5 mr-2" />
        {locale.toUpperCase()}
      </button>

      <div
        className={`absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg transition-all duration-200 z-50 overflow-hidden
        ${abierto ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        style={{ pointerEvents: abierto ? 'auto' : 'none' }}
        role="listbox"
        tabIndex={-1}
      >
        <div className="py-1">
          {LANGUAGES.map(({ code, label }) => {
            const Flag = FLAGS[code];
            const isSelected = locale === code;

            return (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                disabled={isSelected}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors
                ${isSelected
                    ? 'bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/80 active:bg-gray-100 dark:active:bg-gray-700'
                  }`}
              >
                <Flag className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{label}</span>
                {isSelected && (
                  <svg className="ml-auto h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
