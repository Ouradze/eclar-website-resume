module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    [
      'prismjs', {
        languages: ['javascript', 'css', 'markup', 'python', 'graphql'],
        plugins: ['line-numbers', 'show-language'],
        theme: 'okaidia',
        css: true,
      },
    ],
  ],
};
