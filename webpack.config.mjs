import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|src/,
      }
    ],
  },
  performance: {
    maxEntrypointSize: 350000,
    maxAssetSize: 350000
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
  },
  node: {
    __dirname: false
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: { 
       output: {
          ascii_only: true
        }
      }
    })]
  },
  mode: 'production'
};

let sreConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'js/index.js'),
  output: {
    filename: 'sre.js',
    library: 'SRE',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'lib'),
  }
});

let mjConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'ts/common/mathjax.ts'),
  target: 'web',
  output: {
    filename: 'mathjax-sre.js',
    library: 'MJ',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'lib'),
  }
});

export default [sreConfig];
