//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  bracketSpacing: false,
  arrowParens: "avoid",

  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
