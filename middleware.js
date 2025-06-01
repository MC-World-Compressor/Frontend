import { NextResponse } from 'next/server';
import { i18n } from './lib/i18n';

function getLocale(request) {
  // 1. Verificar si ya hay un locale en la URL
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  if (!pathnameIsMissingLocale) return;

  // 2. Obtener locale del header Accept-Language
  const acceptLanguage = request.headers.get('accept-language');
  
  if (acceptLanguage) {
    // Buscar coincidencias con los idiomas soportados
    for (const locale of i18n.locales) {
      if (acceptLanguage.toLowerCase().includes(locale.toLowerCase())) {
        return locale;
      }
    }
  }

  // 3. Fallback al idioma por defecto
  return i18n.defaultLocale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Verificar si la ruta ya tiene un locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redireccionar si no hay locale en la URL
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Redireccionar a la URL con el locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher para todas las rutas excepto archivos estáticos y API
  matcher: [
    // Excluir archivos estáticos y rutas de API
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)'
  ]
};
