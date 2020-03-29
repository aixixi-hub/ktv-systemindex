import request from '@/utils/request'

export function selectAll() {
    return request({
      url: '/ktv-userset/user/selectAll',
      method: 'get',
      }
    )
  }

  export function update(data) {
    return request({
      url: '/ktv-userset/user/update',
      method: 'post',
      data
      }
    )
  }