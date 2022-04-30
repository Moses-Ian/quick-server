const manifest = name =>
`{
  "icons": [
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    }
  ],
  "name": "${name}",
  "short_name": "${name.split(' ')[0]}",
  "orientation": "portrait",
  "display": "standalone",
  "start_url": ".",
  "description": "An app.",
  "background_color": "#ffffff",
  "theme_color": "#ffffff"
}`;

module.exports = manifest;