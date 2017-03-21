const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry : {
    main : './src/main.js',
    jpex : './src/jpex.js'
  },
  output : {
    path : path.resolve(__dirname, '/dist'),
    filename : '[name].js',
    publicPath : '/dist/'
  },
  // Rules / Loaders
  module : {
    rules : [
      // Load .vue files
      {
        test : /\.vue$/,
        loader : 'vue-loader'
      },
      // Transpile ES6 syntax
      {
        test : /\.js$/,
        loader : 'babel-loader',
        exclude : /node_modules/
      },
      // Markdown
      {
        test : /\.md$/,
        loader : 'html-loader!markdown-loader'
      },
      // Sass
      {
        test : /\.scss$/,
        loader : 'style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap'
      },
      // Load plain css
      {
        test : /\.css$/,
        loader : 'style-loader!css-loader!resolve-url-loader'
      },
      // images
      {
        test : /\.(png|jpg|gif|svg)$/,
        loader : 'file-loader',
        options : {
          name : '[name].[ext]'
        }
      },
      // Fonts
      {
        test : /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader',
        options : {
          name : '[name].[ext]'
        }
      }
    ]
  },
  resolve : {
    // Map certain require paths
    alias : {
      'vue$' : 'vue/dist/vue.common.js',
      'components' : path.resolve(__dirname, '../src/components'),
      'src' : path.resolve(__dirname, '../src'),
      'sass' : path.resolve(__dirname, '../src/sass'),
      'content' : path.resolve(__dirname, '../src/content')
    },
    extensions : ['.js', '.json', '.vue']
  },
  plugins : [
    // new webpack.optimize.CommonsChunkPlugin({name : 'vendor', minChunks : Infinity}),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devServer : {
    historyApiFallback : true,
    noInfo : true
  },
  devtool : '#eval-source-map'
};
