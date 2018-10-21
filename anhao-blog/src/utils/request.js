import axios from 'axios'
import { Message, messageBox } from 'element-ui'


//创建axios实例
const service = axios.create({
	baseURL: process.env.BASE_API,		//api中的base_url
	timeout: 15000 //请求超时
})

//request拦截器
service.interceptors.request.use(config => {
	return config
}, error => {
	// Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

//response拦截器
service.interceptors.response.use(

	response => {
		const res = response.data

		if (res.code != 0) {
			 Message({
		        message: res.message,
		        type: 'error',
		        duration: 5 * 1000
      		})
			 return Promise.reject('error')
		}else {
			return response.data
		}
	},
	error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service