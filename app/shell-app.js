'use strict'


// --------------------------------------------------------------------

export default class ShellApp {
  constructor() {
    console.info('ShellApp()')

    this.history = [ '' ]
    this.historyIndex = 0
  }
}
