
module.exports = config:
  files:
    javascripts:
      'libraries.js': /^(?!app\/)/
      'app.js': /^app\//

    stylesheets:
      joinTo: 'app.css'
