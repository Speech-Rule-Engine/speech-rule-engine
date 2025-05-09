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
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
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

let workerConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'js/index.js'),
  output: {
    filename: 'sre.js',
    library: 'SRE',
    libraryTarget: 'umd',
    globalObject: 'self',
    path: path.join(__dirname, 'lib'),
  }
});

let mjConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'js/common/mathjax.js'),
  target: 'web',
  output: {
    filename: 'mathjax-sre.js',
    library: 'MJ',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'lib'),
  }
});

let semConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'js/semantic_tree/semantic.js'),
  target: 'web',
  output: {
    filename: 'semantic.js',
    library: 'SEM',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'lib'),
  }
});

let emlConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'js/enrich_mathml/enrich.js'),
  target: 'web',
  output: {
    filename: 'enrich.js',
    library: 'ENR',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'lib'),
  }
});

let extLibs = Object.assign({}, config, {
  entry: path.resolve(__dirname, 'js/common/lib_external.js'),
  target: 'web',
  output: {
    library: 'LIBS',
    filename: 'sreLibs.js',
    libraryTarget: 'umd',
    globalObject: 'window',
    path: path.join(__dirname, 'lib'),
  }
});

export default [sreConfig];
