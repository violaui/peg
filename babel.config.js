module.exports = function (api) {
  api.cache(false);
  const presets = ["@babel/preset-env"];
  const plugins = ["@babel/plugin-proposal-object-rest-spread"];
  return {
    sourceType: "unambiguous",
    presets,
    plugins
  }
};
