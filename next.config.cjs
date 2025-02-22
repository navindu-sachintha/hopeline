/**
 * Next.js configuration object with Sentry integration
 * @type {import("next").NextConfig}
 * 
 * Configuration includes:
 * - Remote image patterns for cdn.sanity.io and Azure blob storage
 * - Experimental features for tesseract.js integration
 * - Sentry monitoring configuration
 * 
 * Note: @ts-expect-error is used because the withSentryConfig function expects a NextConfig 
 * object but module.exports type cannot be inferred correctly in the context of ES modules,
 * causing a type mismatch between CommonJS and ES module exports
 */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "aqurocm.blob.core.windows.net",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["tesseract.js"],
    outputFileTracingIncludes: {
      "/api/**/*": [
        "node_modules/.pnpm/tesseract.js-core@5.1.1/node_modules/tesseract.js-core/tesseract-core-simd.wasm",
      ],
    },
  },
};

export default config;

// Injected content via Sentry wizard below

import {withSentryConfig} from '@sentry/nextjs'

// @ts-expect-error
module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "terracode",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
