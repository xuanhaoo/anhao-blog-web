import request from '@/utils/request'
import requestUrl from './requestUrl'
export function queryList(query) {
  return request({
    url: '/cate/query',
    method: 'get'
  })
}

// export function uploadImage(formData) {
//   return request({
//     url: '/cate/uploadImg',
//   })
// }

//编辑类别信息返回当前编辑的类别信息
export function queryObject(query) {
  return request({
    url: '/cate/queryObject',
    method: 'get',
    params: query
  })
}
// 上传文件
export function uploadImage () {
  return requestUrl(`/cate/uploadImg`)
}
//保存类别信息
export function saveCate(data) {
  return request({
    url: '/cate/sys/save',
    method: 'post',
    data: data
  })
}
//更新类别信息
export function updateCate(data) {
  return request({
    url: '/cate/sys/update',
    method: 'post',
    data: data
  })
}
//删除
export function deleteCate(data) {
  return request({
    url: '/cate/sys/delete',
    method: 'get',
    params: data
  })
}