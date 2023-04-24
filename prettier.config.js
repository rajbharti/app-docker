// plugin autoloading is not supported when using certain package managers,
// such as pnpm or Yarn PnP. In this case add the plugin to Prettier config
// explicitly:

module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./ui/tailwind.config.cjs",
};
