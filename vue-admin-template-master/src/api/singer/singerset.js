import request from '@/utils/request'

export function getInfo() {
    return request({
      url: '/ktv-userset/singer/selectAll',
      method: 'get',
    }
  )
}

export function deleteById(params) {
  return request({
    url: '/ktv-userset/singer/delete',
    method: 'get',
    params
    }
  )
}

export function update(data) {
  return request({
    url: '/ktv-userset/singer/update',
    method: 'post',
    data
    }
  )
}

export function add(data) {
  return request({
    url: '/ktv-userset/singer/save',
    method: 'post',
    data
    }
  )
}

