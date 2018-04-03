module.exports = {
  copyLeaflet: {
    src: ['{{ROOT}}/node_modules/leaflet/dist/leaflet.css'],
    dest: '{{WWW}}/assets/leaflet/'
  },
  copyLeafletAssets: {
    src: ['{{ROOT}}/node_modules/leaflet/dist/images/**/*'],
    dest: '{{WWW}}/assets/leaflet/images/'
  },
  copyFontawesomeFonts: {
    src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyFontawesomeCss: {
    src: ['{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
    dest: '{{WWW}}/assets/css'
  }
};
