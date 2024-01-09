import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales, pathnames, localePrefix } from './locale.config';

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({ locales, pathnames, localePrefix });