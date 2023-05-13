import Cookies from 'js-cookie'
import config from '@/config'
// import { forEach, hasOneOf, objEqual } from '@/libs/tools'
const { cookieExpires } = config
export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}
