const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

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
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  node: {
    __dirname: false
  },
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
  entry: path.resolve(__dirname, 'ts/index.ts'),
  // devtool: false,
  // target: 'web',
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
  // devtool: false,
  target: 'web',
  output: {
    filename: 'mathjax-sre.js',
    library: 'MJ',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'lib'),
  }
});

module.exports = [sreConfig]; 
