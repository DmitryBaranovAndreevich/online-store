const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
      },
      useBuiltIns: "entry",
    },
  ],
  "@babel/preset-typescript",
];

const plugins = ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"];

module.exports = { presets, plugins };
