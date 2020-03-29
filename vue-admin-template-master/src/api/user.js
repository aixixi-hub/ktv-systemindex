import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ktv-auth/auth/login',
    method: 'post',
    data
  })
}

// 我们通过token去获取用户信息的时候不需要在URL上传递token
export function getInfo() {
  return request({
    url: '/ktv-auth/auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/ktv-auth/auth/logout',
    method: 'get'
  })
}
