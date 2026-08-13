import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              exportType: 'named',
              namedExport: 'ReactComponent',
              replaceAttrValues: {
                '#000': 'currentColor',
                '#000000': 'currentColor',
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default withNextIntl(nextConfig);
