const favicons = require('favicons')
const fs = require('fs')
const mkdirp = require('mkdirp')

const source = './favicon.png'
// Source image(s). `string`, `buffer` or array of `{ size: filepath }`
const configuration = {
  appName: 'haken.no',                  // Your application's name. `string`
  appDescription: 'blog',           // Your application's description. `string`
  developerName: 'Håken Lid',            // Your (or your developer's) name. `string`
  developerURL: 'xn--hken-qoa.no',             // Your (or your developer's) URL. `string`
  background: "#fff",             // Background colour for flattened icons. `string`
  path: "/favicon//",                      // Path for overriding default icons path. `string`
  url: "/",                       // Absolute URL for OpenGraph image. `string`
  display: "standalone",          // Android display: "browser" or "standalone". `string`
  orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
  version: "1.0",                 // Your application's version number. `number`
  logging: false,                 // Print logs to console? `boolean`
  online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
  icons: {
    android: true,              // Create Android homescreen icon. `boolean`
    appleIcon: true,            // Create Apple touch icons. `boolean`
    appleStartup: false,         // Create Apple startup images. `boolean`
    coast: false,                // Create Opera Coast icon. `boolean`
    favicons: true,             // Create regular favicons. `boolean`
    firefox: false,              // Create Firefox OS icons. `boolean`
    opengraph: false,            // Create Facebook OpenGraph image. `boolean`
    twitter: false,              // Create Twitter Summary Card image. `boolean`
    windows: false,              // Create Windows 8 tile icons. `boolean`
    yandex: false,                // Create Yandex browser icon. `boolean`
  },
}

const callback = (error, response) => {
  if (error) {
    console.log(error.status)  // HTTP error code (e.g. `200`) or `null`
    console.log(error.name)    // Error name e.g. "API Error"
    console.log(error.message) // Error description e.g. "An unknown error has occurred"
  }
  if (response.images) {
    mkdirp.sync('./pages/favicon/')
    response.images.forEach((image) => fs.writeFileSync(
      `./pages/favicon/${image.name}`, image.contents))
  }
  if (response.files) {
    mkdirp.sync('./pages/favicon/')
    response.files.forEach((file) => fs.writeFileSync(
      `./pages/favicon/${file.name}`, file.contents))
  }
  if (response.html) {
    fs.writeFileSync('./pages/_favicons.html', response.html.join('\n'))
  }
}

favicons(source, configuration, callback)
