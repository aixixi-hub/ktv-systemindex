import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/col/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/col/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/col/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/col/save',
    method: 'post',
    data
    }
  )
}

