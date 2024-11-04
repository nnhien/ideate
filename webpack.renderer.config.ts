import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

const path = require('path');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@props": path.resolve(__dirname, "src/props"),
      'graphology-layout-forceatlas2/worker': 'graphology-layout-forceatlas2/worker.js'
    },
  },
};
