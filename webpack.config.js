const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV;

const PROJECTS = {
  proj1:"'Proj1'",
  proj2:"'Proj2'"
}

let nameOfProject = (projName)=> console.log('building with param',projName ) || PROJECTS[projName] ? PROJECTS[projName] : PROJECTS['proj1']

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

const buildingForLocal = () => {
  return (NODE_ENV === 'development');
};


const config = {
  mode: 'production',
  output: {
    path: buildingForLocal() ? path.resolve(__dirname) : setPath('dist'),
    publicPath: '/',
    filename: buildingForLocal() ? 'js/[name].js' : 'js/[name].[hash].js'
  },
  
  optimization:{
    runtimeChunk: false,
    splitChunks: {
      chunks: "all", 
    }
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  devtool:'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      //this will create a variable which will be replaced 
      //by any instance of its key accross the project
      __PROJECT_NAME__:nameOfProject(process.env.VENDOR),
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // Use the full build
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: "babel-loader",
          options: { presets: ['env'] }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: !buildingForLocal() ?
            [
              MiniCssExtractPlugin.loader,
              "css-loader", 'sass-loader'
            ] :
            [{
                loader: "style-loader" // creates style nodes from JS strings
              }, {
                loader: "css-loader" // translates CSS into CommonJS
              }, {
                loader: "sass-loader" // compiles Sass to CSS
              }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
          useRelativePath: buildingForLocal()
        }
      }    
    ]
  },
};
module.exports = config; 
