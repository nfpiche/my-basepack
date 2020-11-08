module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    [
      "transform-imports",
      {
        lodash: {
          /* eslint-disable-next-line */
          transform: "lodash/${member}",
          preventFullImport: true,
        },
      },
    ],
  ],
};
