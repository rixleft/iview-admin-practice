import store from '@/store'
export default {
  install (Vue, options) {
    // developmentOff设为true后在开发环境不会收集错误信息，方便开发中排查错误
    if (options.developmentOff && process.env.NODE_ENV === 'development') return
    Vue.config.errorHandler = (error, vm, mes) => {
      let info = {
        type: 'script',
        code: 0,
        mes: error.message,
        url: window.location.href
      }
      Vue.nextTick(() => {
        store.dispatch('addErrorLog', info)
      })
    }
  }
}
