import Cookie from 'js-cookie'

const ss = window.sessionStorage

function get(key, jc = true) {
  return jc ? ss.getItem(key) || false : Cookie.get(key) || false
}

function set(key, token, jc = true) {
  return jc ? ss.setItem(key, token) : Cookie.set(key, token)
}

function remove(key, jc = true) {
  return jc ? ss.removeItem(key) : Cookie.remove(key)
}

function clear() {
  return ss.clear()
}

export { get, set, remove, clear }
