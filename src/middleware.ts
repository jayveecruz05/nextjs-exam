import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix } from './i18nConfig';

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames,
  localePrefix
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(cn|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};