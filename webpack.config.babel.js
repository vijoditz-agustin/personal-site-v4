import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: [
    './src/app/index.jsx'
  ],
  module: {
    preLoaders: [
			{ test: /\.jsx?$/, loader: 'eslint', exclude: '/node_modules/' }
		],
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css!sass' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?[a-z0-9]+)?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
