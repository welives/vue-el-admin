import Cookies from 'js-cookie'

function getToken(key) {
  return Cookies.get(key) || false
}

function setToken(key, token) {
  return Cookies.set(key, token)
}

function removeToken(key) {
  return Cookies.remove(key)
}

export { getToken, setToken, removeToken }
