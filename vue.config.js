const path = require("path");
const {ips}=require("./ips");

function getProxy() {
  if (ips.includes('192.168.10.241')) {
    return 'http://coupon_plugin.test'
  } else if (ips.includes('192.168.10.71')) {
    return 'http://localhost/projects/wcdev/'
  } else if (ips.includes('192.168.10.75')) {
    return 'http://localhost/projects/wcdev/'
  } else if (ips.includes('192.168.10.78')) {
    return 'http://localhost/projects/coupon_plugin/'
  } else if (ips.includes('192.168.10.77')) {
    return 'http://localhost/projects/coupon_plugin/'
  } else if (ips.includes('192.168.10.73')) {
    return 'http://localhost/projects/coupon_plugin/'
  } else if (ips.includes('192.168.10.80')) {
    return 'http://localhost/projects/vtp-leg/'
  }
}

let devServer={
  proxy:getProxy()
}
const plugins=[];

module.exports = {
  devServer: devServer,
  outputDir: path.resolve(__dirname, "admin-assets/"),
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:'',
  filenameHashing: false,
  css: {
    extract: (process.env.NODE_ENV === 'development' ? false : {
      filename: 'css/style.css',
    }),
    sourceMap: process.env.NODE_ENV === 'development'
  },

  configureWebpack: {
    output: {
      filename: 'js/script.js',
    },
    optimization: {
      splitChunks: false
    },
    plugins: plugins
  },

}
