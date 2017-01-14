 const webpackConfig = require('./webpack.browser.config');
 const coveragePath = './build/tests/coverage';

module.exports = function(config) {

    config.set({

        basePath: '.',
        port: 9876,
        colors: true,
        concurrency: Infinity,
        logLevel: config.LOG_WARN,

        singleRun: true,
        autoWatch: false,

        plugins: [
            'karma-*',
        ],

        frameworks: [
            'jasmine',
            // @TODO 'spectron'
        ],

        files: [
			'test/*.ts',
        ],

        preprocessors: {
			'test/*.ts': ['webpack'],
        },

        webpack: {
          	resolve: webpackConfig.resolve,
            module: webpackConfig.module,
        },

        webpackMiddleware: {
            quiet: true,
            stats: {
                chunkModules: false,
                colors: true
            }
        },

        browsers: ['Electron'],

        reporters: [
            'mocha',
            'coverage',
        ],

        coverageReporter: {
            reporters: [
                {
                    type: 'json',
                    dir: coveragePath,
                    subdir: (browser) => {
                        return browser.toLowerCase().split(/[ /-]/)[0];
                    }
                },
                {
                    type: 'html',
                    dir: coveragePath,
                    subdir: (browser) => {
                        return browser.toLowerCase().split(/[ /-]/)[0];
                    }
                }
            ]
        },

        remapIstanbulReporter: {
            src: [
                coveragePath + '/phantomjs/coverage-final.json',
                coveragePath + '/chrome/coverage-final.json',
                coveragePath + '/electron/coverage-final.json',
                coveragePath + '/firefox/coverage-final.json',
            ],
            reports: {
                html: coveragePath,
            },
            timeoutNotCreated: 2000,
            timeoutNoMoreFiles: 2000,
        },

    });

};
