// plugin autoloading is not supported when using certain package managers,
// such as pnpm or Yarn PnP. In this case add the plugin to Prettier config
// explicitly:

module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  // referencing it as it is in different dir or else not required
  tailwindConfig: "./ui/tailwind.config.cjs",
};
