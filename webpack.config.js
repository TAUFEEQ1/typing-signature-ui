const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
//load env into process
dotenv.config();
module.exports = {
    entry: './src/app.js',
    mode:'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devServer:{
        static:path.join(__dirname,'dist'),
        port:9000
    },
    resolve:{
        fallback: {
          "path": require.resolve("path-browserify")
        }
      },
      plugins:[
        //define process.env
        new webpack.DefinePlugin({
          'process.env':JSON.stringify(process.env)
        })
      ]
}