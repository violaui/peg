const pkg = require("./package.json")
module.exports = function (api) {
  api.cache.never();

  const presets = [
    ["@babel/preset-env",
      {
        targets: {
          node: true
        }
      }]
  ];
  const plugins = [
    "@babel/plugin-proposal-object-rest-spread",
    ["add-header-comment", {
      header: [`${pkg.name} v${pkg.version} | ${pkg.repository} | ${pkg.license} License\nAuthor: ${pkg.author.name} | ${pkg.author.url}`]
    }]
  ];
  return {
    sourceType: "unambiguous",
    presets,
    plugins,
  }
};
