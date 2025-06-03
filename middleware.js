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
    // Extraer los idiomas del header y buscar el primero soportado
    const accepted = acceptLanguage.split(',').map(l => l.split(';')[0].trim().slice(0,2));
    for (const lang of accepted) {
      if (i18n.locales.includes(lang)) {
        return lang;
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
    if (pathname === '/' || pathname === '') {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
    let newPath = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    if (newPath === `/${locale}`) {
      newPath = `/${locale}/`;
    }
    return NextResponse.redirect(new URL(newPath, request.url));
  }
}

export const config = {
  // Matcher para todas las rutas excepto archivos estáticos y API
  matcher: [
    // Excluir archivos estáticos y rutas de API
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)'
  ]
};
