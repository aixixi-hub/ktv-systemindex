import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/album/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/album/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/album/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/album/save',
    method: 'post',
    data
    }
  )
}

