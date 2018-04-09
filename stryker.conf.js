module.exports = function (config) {
  config.set({
    mutate: ["src/**/*.js"],
    testRunner: "karma",
    mutator: "javascript",
    transpilers: [],
    reporter: ["html", "clear-text", "progress"],
    testFramework: "jasmine",
    coverageAnalysis: "off",
    karmaConfigFile: "karma.conf.js",
    karmaConfig: {
      preprocessors: {},
      reporters: []
    },
  });
};
