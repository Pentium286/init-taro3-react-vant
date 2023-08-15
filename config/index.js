const path = require('path');
const config = {
  projectName: 'myApp',
  date: '2023-7-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/components/vant-weapp/', to: 'dist/components/vant-weapp/' },
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@c': path.resolve(__dirname, '..', 'src/components'),
    '@u': path.resolve(__dirname, '..', 'src/utils'),
    '@a': path.resolve(__dirname, '..', 'src/assets'),
    '~A': path.resolve(__dirname, '..', 'src/packageA'),
    '~B': path.resolve(__dirname, '..', 'src/packageB'),
    '@vant': path.resolve(__dirname, '..', 'src/components/vant-weapp'),
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  } else if (process.env.NODE_ENV === 'test') {
    return merge({}, config, require('./test'));
  } else {
    return merge({}, config, require('./prod'));
  }
};
