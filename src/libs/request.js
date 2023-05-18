import axios from 'axios'
// import store from '@/store'
import config from '@/config'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // if(!Object.keys(this.queue).length){
        //
        // }
        this.queue[url] = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (config) => {
        return config
      },
      (error) => {
        this.destroy(url)
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const axiosInstance = new HttpRequest(baseUrl)
export default axiosInstance
