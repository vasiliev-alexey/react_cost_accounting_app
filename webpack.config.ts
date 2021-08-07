/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import 'webpack-dev-server';
// import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import * as webpack from 'webpack';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

const Dotenv = require('dotenv-webpack');
//require('dotenv').config();

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig = (env: {
  production: boolean;
  development: boolean;
}): Configuration => ({
  entry: './src/ts/index.tsx',
  ...(env.production || !env.development ? {} : { devtool: 'source-map' }),
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 5000,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
    //@ts-ignore
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },

  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /dist/,
      },

      {
        test: /\.png/,
        use: {
          loader: 'url-loader',
        },
        include: [path.resolve(__dirname, 'src/img')],
      },

      {
        test: /\.(sass|scss|css)$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.html',
      favicon: './src/img/cost.png',
    }),
    new Dotenv({
      safe: true,
      path: path.resolve(__dirname, '.env'),
    }),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': env.production || !env.development,
      'process.env.NAME': JSON.stringify(require('./package.json').name),
      'process.env.VERSION': JSON.stringify(require('./package.json').version),
    }),

    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
  ],
});

export default webpackConfig;
