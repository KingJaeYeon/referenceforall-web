import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ko', 'ja','cn'],
    defaultLocale: 'ko',
  },
};

export default withNextIntl(nextConfig);
