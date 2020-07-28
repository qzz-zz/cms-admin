import axios from 'axios';

//获取文章列表
let list = (data) =>axios.get('/article/list',{params:data});
//编辑文章
let edit = (data) => axios.post('/article/edit',data);
//获取指定id的文章详情
let detail = (data) =>axios.get('/article/detail',{params:data});
//添加新文章
let add =(data) => axios.post('/article/add',data);

export default{
	list,
	edit,
	detail,
	add,
}