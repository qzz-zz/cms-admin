import axios from 'axios';

//获取用户列表
let list = (data) =>axios.get('/user/list',{params:data});
//用户个人资料
let info = (data) => axios.get('/user/', { params: data });
//编辑用户
let edit =(id,data) => axios.put(`/user/${id}`,data);
//删除用户
let remove =(id) => axios.delete(`/user/${id}`);

export default{
	list,
	info,
	edit,
	remove,
}