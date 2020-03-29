import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/song/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/song/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/song/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/song/save',
    method: 'post',
    data
    }
  )
}

