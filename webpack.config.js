// const OpenBrowserPlugin = require('webpack-open-browser');
var webpack =  require("webpack");
const path = require('path');

module.exports = {
  entry: './src/app.js',  // 指定入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), //__dirname代表当前目录
    filename: 'main.js',  // 指定输出文件名
    publicPath: '/', // 在开发环境中，所有资源的公共路径前缀
  },
  mode: 'development',  // 指定模式：development 或 production

  devServer: {
    static:[
      {
          directory: path.join(__dirname, 'public'), // 提供静态文件如 index.html
          publicPath: '/', // 将静态文件挂载到根路径
      },
      {
          directory: path.join(__dirname, 'dist'), // 提供打包后的资源文件
          publicPath: '/dist', // 将打包后的文件挂载到 /dist 路径
      },
  ],
    compress: true,
    port: 8080,
},

  module:{
    rules:[
      {
        test: /\.json$/, // 处理 .json 文件
        type: 'javascript/auto', // 这里是为了确保能够正确解析
        use: 'json-loader',
      },
      {
        test: /\.(js|jsx)$/, // 处理 .json 文件
        // type: 'javascript/auto', // 这里是为了确保能够正确解析
        use: 'babel-loader',
      },
      {
         test: /\.css$/,
         use:[
          "style-loader",
          "css-loader",
          
         ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset', // Webpack 5's way to handle images
        parser: {
          dataUrlCondition: {
            maxSize: 2048, // If image size is smaller than 2KB, it's inlined as base64
          },
        },
      },
      {
        test: /\.less$/,
        use:[
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      
    ]
  },
  resolve: {
    fallback: {
      'readline': require.resolve('readline'),
      // 添加更多需要的 Node.js 模块的 fallback
    }
  },
  plugins: [
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    //可在业务js代码中使用_DEV_判断是否是dev模式（dev模式下可以提示错误、测试报告等，production模式不提示）
  new webpack.DefinePlugin({
    _DEV_:JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev')|| 'false'))
  })
]



};
