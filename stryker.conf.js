module.exports = function(config) {
  config.set({
    mutate: ["src/**/*.js"],
    mutator: "javascript",
    transpilers: [],
    reporter: ["html", "clear-text", "progress"],
    testRunner: "karma",
    testFramework: "jasmine",
    coverageAnalysis: "perTest",
    karma: {
      configFile: "karma.conf.js"
    }
  });
};
