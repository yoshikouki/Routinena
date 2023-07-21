/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en", "ja"],
  //   defaultLocale: "ja",
  // },

  // https://nextjs.org/docs/app/api-reference/next-config-js/devIndicators
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

export default config;
