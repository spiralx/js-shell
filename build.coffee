
fs = require 'fs'


shell =
  version: '0.1.6'
  html_file: 'shell.html'
  out_file: 'shell-bookmarklet.js'
  width: 800
  margin: 20
  height: 0.9

bookmarklet_code =
  prefix: """javascript:(function(w){w=window.open("about:blank","_blank","width=#{shell.width},height="+screen.height*#{shell.height}+",left="+(screen.width-#{shell.width + shell.margin})+",resizable=yes,scrollbars=yes");w.document.write('"""
  suffix: '\');w.document.close();})()'


getBookmarklet = (html) =>
  # chunks = (chunk for chunk in html.split /(<[^>]+>)/g when chunk.match /\s*\S/)
  chunks = (chunk for chunk in html.split /\s*(<[^>]+>)\s*/g when chunk)

  escaped = chunks.join ''
    .replace /\$title/g, "JavaScript Shell #{shell.version}"

  bookmarklet_code.prefix + escaped + bookmarklet_code.suffix


console.info "Reading #{shell.html_file}...\n"

source = fs.readFileSync shell.html_file, encoding: 'UTF-8'
output = getBookmarklet source

console.info output

fs.writeFileSync shell.out_file, output, encoding: 'UTF-8'

console.info "\nWrote #{shell.out_file}...\n"
