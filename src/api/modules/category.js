import axios from 'axios';

//获取子级分类
let subcate = (data) => axios.get('/category/sub',{params:data});
//添加分类
let insert = (data) => axios.post('/category/add',data);
//编辑分类
let edit = (data) => axios.post('/category/edit',data);
//删除分类
let remove = (data) => axios.post('/category/delete',data);

export default{
	subcate,
	insert,
	edit,
	remove,
}