module.exports = function (api) {
  api.cache.never();

  const presets = [
    ["@babel/preset-env",
      {
        targets: {node: "current"}
      }]
  ];
  const plugins = [
    "@babel/plugin-proposal-object-rest-spread",
  ];
  return {
    sourceType: "unambiguous",
    presets,
    plugins,
    // only: ["./src"]
  }
};
