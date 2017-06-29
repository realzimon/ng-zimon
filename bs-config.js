module.exports = {
  injectChanges: true,
  files: [
    './**/*.{html,htm,css,js}'
  ],
  watchOptions: {
    ignored: [
      'node_modules',
      'styles.css'
    ]
  },
  server: {
    baseDir: './',
    middleware: {
      0: null // Disables request logging of lite-server
    }
  },
  ghostMode: false,
  open: false,
  reloadOnRestart: true,
  reloadDebounce: 500
};
