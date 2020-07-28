import Vue from 'vue'
//服务方式
import { Message } from 'element-ui';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 页面级组件
import Layout from '@/components/Layout.vue'

const routes = [{
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta:{requiresAuth: false},
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta:{requiresAuth: false},
	},
	// {
	// 	path: 'test',
	// 	name: 'Test',
	// 	component: () => import('@/views/Test.vue')
	// },
	// 文章
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta:{requiresAuth: true},
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue')
			},
			{
				path: 'release',
				name: 'ArticleRelease',
				component: () => import('@/views/Article/Release.vue')
			},
			{
				path: 'edit/:id',
				name: 'ArticleEdit',
				component: () => import('@/views/Article/Edit.vue'),
				props: true,//解耦
			}
		]

	},
	// 用户
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta:{requiresAuth: true},
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue'),
			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')
			}
		]
	},
	// 管理员
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		meta:{requiresAuth: true},
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdminEdit',
				component: () => import('@/views/Admin/Edit.vue'),
				props: true,
			},
		]
	},
	// 账户
	{
		path: '/account/',
		name: 'Account',
		component: Layout,
		meta:{requiresAuth: true},
		children: [{
			path: 'set',
			name: 'AccountSet',
			component: () => import('@/views/Account/Set.vue')
		}, ]
	},
	// 权限
	{
		path: '/permission/',
		name: 'Permission',
		component: Layout,
		meta:{requiresAuth: true},
		children: [{
			path: 'role',
			name: 'PermissionRole',
			component: () => import('@/views/Permission/Role.vue')
		}, ]
	},
	// 分类
	{
		path: '/classify/',
		name: 'Classify',
		component: Layout,
		meta:{requiresAuth: true},
		children: [{
			path: 'list',
			name: 'ClassifyList',
			component: () => import('@/views/Classify/List.vue')
		}]
	},
]

const router = new VueRouter({
	routes
})

//全局守卫
router.beforeEach((to, from, next) => {
	//登陆注册不进行校验，直接放行
	//校验该地址
	// if(to.name == "Login" || to.name == "Register"){
	// 	next();
	// 	return;
	// }
	
	//根据meta元信息校验路由是否登录需要授权
	let isRequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	// 不需要校验
	if(!isRequiresAuth){
		next();
		return;
	}
	//校验token
	let token =sessionStorage.token;
	// 有token情况,立即放行
	if(token){
		next();
		return;
	}
	//无token情况，强制跳转登录
	Message.error('无效的info，请重新登录！');
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);
	},2000);
	
	// if(!token){
	// 	Message.error('无效的info，请重新登录！');
	// 	setTimeout(() => {
	// 		next(`/login?redirect=${to.path}`);
	// 	},2000);
	// }
	// next();
});

export default router
