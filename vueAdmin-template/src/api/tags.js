import request from '@/utils/request'
import requestUrl from './requestUrl'

export function queryTagsList() {
  return request({
    url: '/tags/query',
    method: 'get'
  })
}
//编辑标签信息返回当前编辑的标签信息
export function queryTagObject(query) {
  return request({
    url: '/tags/queryObject',
    method: 'get',
    params: query
  })
}
//保存标签信息
export function saveTag(data) {
  return request({
    url: '/tags/sys/save',
    method: 'post',
    data: data
  })
}
//更新标签信息
export function updateTag(data) {
  return request({
    url: '/tags/sys/update',
    method: 'post',
    data: data
  })
}
//删除
export function deleteTag(data) {
  return request({
    url: '/tags/sys/delete',
    method: 'get',
    params: data
  })
}