import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async rewrites() {
    return [
      { source: "/:locale/@:username", destination: "/:locale/user/@:username" },
      { source: "/:locale/@:username/list", destination: "/:locale/user/@:username/list" },
      { source: "/:locale/@:username/posts", destination: "/:locale/user/@:username/posts" },
      { source: "/:locale/@:username/comments", destination: "/:locale/user/@:username/comments" },
      { source: "/:locale/@:username/list/:slug", destination: "/:locale/user/@:username/list/:slug" },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
