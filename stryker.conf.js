module.exports = function(config) {
  config.set({
    mutate: ["src/**/*.js"],
    mutator: "javascript",
    transpilers: [],
    reporters: ["html", "clear-text", "progress"],
    testRunner: "karma",
    testFramework: "jasmine",
    coverageAnalysis: "perTest",
    maxConcurrentTestRunners: 4,
    karma: {
      configFile: "karma.conf.js"
    }
  });
};
