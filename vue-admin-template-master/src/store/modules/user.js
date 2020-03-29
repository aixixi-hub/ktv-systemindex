import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login   登陆方法
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response)
        // 存储 token
        setToken(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 根据token得到用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 因为token在请求头里面有，所以我们不需要传递token
      getInfo().then(response => {
        // response就是响应数据 返回的用户名
        // console.info(response)
        if (!response) {
          reject('Verification failed, please Login again.')
        }
        // 这个用来放置用户名
        commit('SET_NAME', response)
        // 用来存放我们的element自带的图标图标
        commit('SET_AVATAR', state.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout  登出
  /**
   * 1先去把redis中的token除掉
   *      1.当点击登出的时候只能删除自己的token
   *      2.因为在redis中存储的token的key值是用户名
   *      3.只需要点击登出的时候将token传入后端
   *      4.后端只需要将token中的用户名获取，并且根据用户名删除redis里边的key
   *      5.当发送请求的时候，会经过请求拦截器
   *      6.请求拦截器里面就包含了 往请求头里面添加token
   * 2把浏览器的token移除掉
   */
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
