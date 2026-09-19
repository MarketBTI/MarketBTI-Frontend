import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: {
    mode: 'auto',
    glob: ['**/*.css.ts'],
  },
});

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
} satisfies NextConfig;

export default withVanillaExtract(nextConfig);
