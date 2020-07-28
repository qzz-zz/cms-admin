import axios from 'axios';
//Loading 服务方式
import { Loading, Message } from 'element-ui';
//路由实例
import router from '@/router/index';
//Loading实例
let loading; // 声明一个变量

//设置默认baseURL
axios.defaults.baseURL = 'http://localhost:3001';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	// console.log(config);
	//开启loading
	loading=Loading.service({background:"rgba(0,0,0,0.5)"});
	
	//判断是否携带token
	if(config.url == '/admin/login' || config.url == '/admin/register'){
		return config;
	}
	//获取token
    let token=sessionStorage.token;
	//无token
	if(!token){
		Message.error('无效的info，请重新登录！');
		setTimeout(() => {
			loading.close();
			console.log(router);
			router.replace('/login');	//跳转路由 无法回退
			
		},2000)
	}
	//有token
	config.headers.Authorization=`Bearer ${token}`;
	return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	//在这里你可以判断后台返回数据携带的请求码
	let {status,data} = response;
	
	//关闭loading 
	loading.close();
	//判断后台返回数据携带的状态码
	// switch (status){
	// 	case:401:
	// 		break;
	// 	case:404:
	// 		break;
	// 	case:200:
	// 		break;
	// 	default:
	// 		break;
	// }
	return data;
	//console.log(response);
	// return response.data;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
