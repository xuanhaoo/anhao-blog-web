import request from '@/utils/request'



//获取 友链
export function queryLinks(query) {
  return request({
    url: '/linksAbout/links',
    method: 'get'
  })
}


//获取 about
export function queryAbout(query) {
  return request({
    url: '/linksAbout/about',
    method: 'get'
  })
}

//保存（友链+关于）
export function save(data) {
  return request({
    url: '/linksAbout/sys/save',
    method: 'post',
    data: data
  })
}

//更新（友链+关于）
export function update(data) {
  return request({
    url: '/linksAbout/sys/update',
    method: 'post',
    data: data
  })
}