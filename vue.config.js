

module.exports = {
    // 选项...
    publicPath: './',                   //部署应用包时的URL
    outputDir: 'dist',                  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
	assetsDir: './static',              //放置生成的静态资源
    lintOnSave: false,                  //保存时是否要lint
    productionSourceMap: false,         //打包后，如果运行报错，会生成map文件，定位到哪里报错了。如果不想生成map文件，或者不想源码被窥探，设为false
    devServer: {
        port: 8088,                     //端口
        overlay: {                      //可以让浏览器同时显示警告和错误
            warnings: true, 
            errors: true
        },
        proxy: {                        //做一下代理，当为/test，时，代理测试服
            '/test': {
                target: 'https://test.power-www.com',
                changeOrigin: true,
                pathRewrite: {              //如果没有/test，用什么来替代
					'^/test': ''
				},
            },
            '/dev': {
                target: 'https://dev.power-www.com',
                changeOrigin: true,
                pathRewrite: {              //如果没有/dev，用什么来替代
					'^/dev': ''
				},
            }
        }
    }
}