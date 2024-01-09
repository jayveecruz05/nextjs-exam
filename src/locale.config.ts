import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'cn'] as const;

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    cn: '/路径名'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;