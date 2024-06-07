// eslint-disable-next-line no-undef
module.exports = {
  appUrl: '/static/ct108-admin-site/test/', // 项目路径  如   /static/mobile/test/
  envConfig: {
    development: {
      domainUrl: '',
      indexPath: ''
    },
    stable: {
      domainUrl: '//staticadm.tcy365.org:1505',
      indexPath: '1505-stable'
    },
    dev: {
      domainUrl: '//staticadm.tcy365.org:1506',
      indexPath: '1506-develop'
    },
    ctest: {
      domainUrl: '//staticadm.tcy365.org:1507',
      indexPath: '1507-test'
    },
    pre: {
      domainUrl: '//staticadm.tcy365.com:2505',
      indexPath: '2505-pre'
    },
    production: {
      domainUrl: '//staticadm.tcy365.com',
      indexPath: '80-static'
    }
  },
  devServer: {
    host: '0.0.0.0',
    //disableHostCheck: true,
    port: 1507, // 端口号
    open: '/',
    // 配置多个代理
    proxy: {
      '/api/Ydmalladm': {
        target: 'http://yapi.tcy365.org:3000/mock/1554/', // 本地模拟数据服务器
        changeOrigin: true,
        //logLevel: 'debug', //是否输出请求log
        rewrite: (path) => path.replace(/^\/api\/Ydmalladm/, '/api')
      }
    }
  }
};
