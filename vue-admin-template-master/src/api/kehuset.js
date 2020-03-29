import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/kehu/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/kehu/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/kehu/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/kehu/save',
    method: 'post',
    data
    }
  )
}

