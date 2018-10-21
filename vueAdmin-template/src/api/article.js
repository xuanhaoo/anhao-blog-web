import request from '@/utils/request'



// 获取文章列表
export function queryList(query) {
  return request({
    url: '/article/sys/list',
    method: 'get',
    params: query
  })
}
//获取单篇文章
export function queryObject(id) {
  return request({
    url: '/article/query/'+id,
    method: 'get',
  })
}
//查看单篇文章时，加载该文章标签
export function queryTags(id) {
  return request({
    url: '/article/queryTag/'+id,
    method: 'get',
  })
}
//保存文章
export function saveArticle(data) {
  return request({
    url: '/article/sys/save',
    method: 'post',
    data: data
  })
}
//更新文章
export function updateArticle(data) {
  return request({
    url: '/article/sys/update',
    method: 'post',
    data: data
  })
}
//删除文章
export function deleteArticle(params) {
  return request({
    url: '/article/sys/delete',
    method: 'get',
    params: params
  })
}
export function articleUploadImg(data) {
	return request({
		url: '/article/articleUploadImg',
		method: 'post',
		data: data
		// headers: {
		// 	'Content-Type': 'multipart/form-data'
		// }
	})
}