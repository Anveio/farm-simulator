const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    join(__dirname, 'src/index.tsx'),
  ],
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ["webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: join(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        }],
      },
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader" 
      },
    ],
    loaders: [{
      test: /\.scss/,
      loaders: ['style', 'css', 'sass']
    }]
  },
};