import { getUserInfo, login } from '@/api/user'
import { getToken, setToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    access: '',
    hasGetInfo: false,
    token: getToken()
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            const data = res.data
            commit('setToken', data.token)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token)
            .then((res) => {
              const data = res.data
              commit('setAvatar', data.avatar)
              commit('setUserName', data.name)
              commit('setUserId', data.user_id)
              commit('setAccess', data.access)
              commit('setHasGetInfo', true)
              resolve(data)
            })
            .catch((err) => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  computed: {},
  getters: {}
}
