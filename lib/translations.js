
import es from '../locales/es.json';
import en from '../locales/en.json';

const translations = { es, en };


function getNestedTranslation(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Hook personalizado para traducciones
export function useTranslations(locale = 'es') {
  const t = (key, defaultValue = key) => {
    const translation = getNestedTranslation(translations[locale], key);
    return translation || getNestedTranslation(translations.es, key) || defaultValue;
  };
  
  return { t };
}

// Función helper para obtener traducciones directamente
export function getTranslation(locale, key, defaultValue = key) {
  const translation = getNestedTranslation(translations[locale], key);
  return translation || getNestedTranslation(translations.es, key) || defaultValue;
}

// Función para obtener toda la sección de traducciones de una página
export function getPageTranslations(locale, pageName) {
  return translations[locale]?.[pageName] || translations.es?.[pageName] || {};
}
