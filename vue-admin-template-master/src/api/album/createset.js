import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/crt/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/crt/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/crt/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/crt/save',
    method: 'post',
    data
    }
  )
}

