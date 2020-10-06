const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'ts/index.ts'),
  mode: 'development',
  target:'node',
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
  output: {
    filename: 'sretest.js',
    library: 'sretest',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.join(__dirname, 'dist'),
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
      },
      sourceMap: true
    })]
  },
  mode: 'production'
};

