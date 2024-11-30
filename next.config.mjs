import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:locale/@:username", // /[locale]/@[username] 경로
        destination: "/:locale/user/@:username", // /[locale]/user/@[username]로 매핑
      },
      {
        source: "/:locale/@:username/list/:slug",
        destination: "/:locale/user/@:username/list/:slug",
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withNextIntl(bundleAnalyzer(nextConfig));
