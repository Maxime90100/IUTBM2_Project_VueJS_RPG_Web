const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, // ['vuetify']
  pwa: {
    name: 'My PWA App',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
      exclude: [/_redirect/, /\.map$/, /_headers/],
    },
  }
})
