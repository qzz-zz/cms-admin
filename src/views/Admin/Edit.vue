<template>
	<el-card class="box-card">
		<div slot="header">
			<span>编辑管理员</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username" size="small"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="ruleForm.fullname" size="small"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model.number="ruleForm.tel" size="small"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email" size="small"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<!-- <el-upload class="avatar-uploader" action="/upload/common/" :data="{type:'avatar'}" 
				:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
				<!-- <upload :ruleForm="ruleForm"></upload> -->
				
				                                      <!-- 上传成功事件 -->           <!-- 删除头像事件 -->
				<single-upload :url="ruleForm.avatar" @success="handleUploadSuccess" @remove="ruleForm.avatar='' "></single-upload>
				
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="saveAdmin('ruleForm')" size="medium">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	
	export default {
		props:['id'],
		components:{
			// upload
			SingleUpload 
		},
		data() {
			// 手机号验证
			var checkPhone = (rule, value, callback) => {
				const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
				if (!value) {
					return callback(new Error('手机号码不能为空'))
				}
				setTimeout(() => {
					if (!Number.isInteger(+value)) {
						callback(new Error('请输入数字值'))
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('手机号码格式不正确'))
						}
					}
				}, 100)
			};
			return {
				// disabled: true,
				ruleForm: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					email: '',
					avatar: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 7,
							message: '长度在 1 到 7 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						validator: checkPhone,
						trigger: 'blur'
					}],
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change']
						}
					],
					avatar: [{
						required: true,
						message: '请上传头像',
						trigger: 'blur'
					}],
				}
			};
		},
		created() {
			//路由对象$route  路由实例$router
			// console.log(this.$route.params.id);
			//路由参数id
			// this.loadInfo(this.$route.params.id);
			//index.js里加了props:true之后 简化为
			this.loadInfo(this.id);
		},
		watch:{
			//watch是一个对象 route是一个方法
			'$route'(to,from){
				//改变路径就会输出
				// console.log(to);
				// console.log(from);
				
				//改变网址上的路径 内容也会改变
				let {id} = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			//获取管理员个人资料
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id });
				if (status) {
					//数据在表单中显示出来
					this.ruleForm = data;
				}
			},
			//保存修改
			saveAdmin(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验成功
					let { status, msg } = await Admin.edit({ ...this.ruleForm });
					if (status) {
						this.$message.success(msg);
						this.$router.push('/admin/list');
					} else {
						this.$message.erro(msg);
					}
				});
			},
			//头像上传成功
			handleUploadSuccess({status, msg, data}){
				this.ruleForm.avatar=data;
			},
		}
	}
</script>

<style>
</style>
