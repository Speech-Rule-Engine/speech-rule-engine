const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './ts/index.ts',
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
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
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

