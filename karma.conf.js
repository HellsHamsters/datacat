module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-htmlfile-reporter')
        ],

        reporters: ['progress', 'html'],

        htmlReporter: {

            outputFile: 'tests-results/tests.html',

            pageTitle: 'Unit Tests',
            subPageTitle: __dirname

        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false

    });
};