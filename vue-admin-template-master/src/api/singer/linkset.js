import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/lkm/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/lkm/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/lkm/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/lkm/save',
    method: 'post',
    data
    }
  )
}

