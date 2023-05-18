import axiosInstance from '@/libs/request'

export const login = (data) => {
  return axiosInstance.request({
    url: 'login',
    data,
    method: 'post'
  })
}
export const getUserInfo = (token) => {
  return axiosInstance.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}
