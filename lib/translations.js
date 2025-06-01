import fs from 'fs';
import path from 'path';

// Cache para las traducciones
let translationsCache = null;

// Función para cargar las traducciones desde archivos JSON
function loadTranslations() {
  if (translationsCache) return translationsCache;
  
  try {
    const localesDir = path.join(process.cwd(), 'locales');
    const esTranslations = JSON.parse(fs.readFileSync(path.join(localesDir, 'es.json'), 'utf8'));
    const enTranslations = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
    
    translationsCache = {
      es: esTranslations,
      en: enTranslations
    };
    
    return translationsCache;
  } catch (error) {
    console.error('Error loading translations:', error);
    return { es: {}, en: {} };
  }
}

// Función helper para obtener traducciones anidadas
function getNestedTranslation(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Hook personalizado para traducciones
export function useTranslations(locale = 'es') {
  const translations = loadTranslations();
  
  const t = (key, defaultValue = key) => {
    const translation = getNestedTranslation(translations[locale], key);
    return translation || getNestedTranslation(translations.es, key) || defaultValue;
  };
  
  return { t };
}

// Función helper para obtener traducciones directamente
export function getTranslation(locale, key, defaultValue = key) {
  const translations = loadTranslations();
  const translation = getNestedTranslation(translations[locale], key);
  return translation || getNestedTranslation(translations.es, key) || defaultValue;
}

// Función para obtener toda la sección de traducciones de una página
export function getPageTranslations(locale, pageName) {
  const translations = loadTranslations();
  return translations[locale]?.[pageName] || translations.es?.[pageName] || {};
}
