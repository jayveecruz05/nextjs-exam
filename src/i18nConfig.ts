import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'cn'] as const;

export const pathnames = {
  '/': '/',
  '/comment': '/comment',
  '/domains': '/domains',
  '/length': '/length',
  '/posted': '/posted'
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;