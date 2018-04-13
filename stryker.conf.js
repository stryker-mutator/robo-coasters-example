module.exports = function(config) {
  config.set({
    testRunner: "karma",
    mutator: "javascript",
    transpilers: [],
    reporter: ["html", "clear-text", "progress"],
    testFramework: "jasmine",
    coverageAnalysis: "perTest",
    karmaConfigFile: "karma.conf.js",
    mutate: ["src/**/*.js"]
  });
};
