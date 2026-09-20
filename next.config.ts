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
  env: {
    NEXT_KAKAO_MAP_KEY: process.env.NEXT_KAKAO_MAP_KEY,
  },
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
