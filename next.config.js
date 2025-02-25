/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      },
      {
        protocol: 'https',
        hostname: 'aqurocm.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ],
  },
  experimental:{
    serverComponentsExternalPackages: ['tesseract.js'],
    outputFileTracingIncludes: {
      '/api/**/*': ['node_modules/.pnpm/tesseract.js-core@5.1.1/node_modules/tesseract.js-core/tesseract-core-simd.wasm']
    }
  }
};

export default config;
