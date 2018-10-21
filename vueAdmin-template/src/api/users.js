import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: query
  })
}

export function addUser(data) {
  return request({
    url: '/sys/user/save',
    method: 'post',
    data: data
  })
}

export function getUser(id) {
	return request({
		url: '/sys/user/userInfo',
		method: 'get',
		params:  id
	})
}

export function updateUser(data) {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data: data
  })
}
export function deleteUser(data) {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    data: data
  })
}

export function updatePs(data) {
  return request({
    url: '/sys/user/updatePs',
    method: 'post',
    data: {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }
  })
}
