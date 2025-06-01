
import { getPageTranslations } from '@/lib/translations';
export default function Footer({ locale = 'es' }) {
  const t = getPageTranslations(locale, 'footer');
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 py-8 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">MC World Compressor</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <u><a href="mailto:contacto@mcworldcompressor.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                srkktua@protonmail.com
              </a></u>
            </p>
          </div>
          
          <div className="text-center md:text-right text-sm text-gray-600 dark:text-gray-400">
            <p>{t.developedBy} <u><a href="https://github.com/Papela" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Papela</a></u></p>
            <p className="mt-1">&copy; {currentYear} MC World Compressor. {t.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
