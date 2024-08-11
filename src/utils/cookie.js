import Cryptr from 'cryptr'

const singletonEnforcer = Symbol()

class CookieHandler {
  secretKey
  cryptoHandler

  static cookieHandlerInstance

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Cookie single instance')
    }

    this.secretKey = navigator.userAgent
    this.cryptoHandler = new Cryptr(this.secretKey)
  }

  static get instance() {
    if (!this.cookieHandlerInstance) {
      this.cookieHandlerInstance = new CookieHandler(singletonEnforcer)
    }

    return this.cookieHandlerInstance
  }

  setCookie(name, value, minutesExpired) {
    const date = new Date()
    date.setMinutes(date.getMinutes() + minutesExpired)
    const expires = `expires=${date.toUTCString()}`
    const encryptedValue = this.cryptoHandler.encrypt(value) // Encrypt original value
    document.cookie = `${name}=${encryptedValue};${expires};path=/`
  }

  removeCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  }

  getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const partsPop = parts.pop()

      if (partsPop)
      try {
        return this.cryptoHandler.decrypt(partsPop.split(';').shift()) // Decrypt for get original value
      } catch (error) {
        this.clearCookies()
        return ''
      }
    }
    return ''
  }

  checkCookie(name) {
    const user = this.getCookie(name)
    if (user !== '' && user !== null) {
      return true
    }
    return false
  }

  clearCookies() {
    const cookies = document.cookie.split(";")

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      this.removeCookie(name)
    }
  }
}

export default CookieHandler.instance
