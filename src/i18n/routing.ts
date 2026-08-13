import { defineRouting } from 'next-intl/routing';
import { languages } from '@/utils/constants';

export const routing = defineRouting({
    locales: languages.map((language) => language.code),
    defaultLocale: 'en',
    localePrefix: 'as-needed',
    localeDetection: false,
    localeCookie: false,
});
