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
  ui: {
    port: 3001,
    weinre: {
      port: 3002
    }
  },
  ghostMode: false,
  open: false,
  reloadOnRestart: true,
  reloadDebounce: 500
};
