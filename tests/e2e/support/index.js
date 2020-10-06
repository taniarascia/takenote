import './commands'

// Since before unload alert hangs console tests, the alert has to be disabled
// Check https://github.com/cypress-io/cypress/issues/2118 for more info
Cypress.on('window:before:load', function (win) {
  const original = win.EventTarget.prototype.addEventListener

  win.EventTarget.prototype.addEventListener = function () {
    if (arguments && arguments[0] === 'beforeunload') {
      return
    }
    return original.apply(this, arguments)
  }

  Object.defineProperty(win, 'onbeforeunload', {
    get: function () {},
    set: function () {},
  })
})
