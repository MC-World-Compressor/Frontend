'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSelector({ locale }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const changeLanguage = (newLocale) => {
    // Remover el locale actual del pathname y agregar el nuevo
    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPathname);
  };
  
  return (
    <div className="relative group">
      <button className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center">
        🌐 {locale.toUpperCase()}
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => changeLanguage('es')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-md"
        >
          🇪🇸 Español
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-md"
        >
          🇺🇸 English
        </button>
      </div>
    </div>
  );
}
