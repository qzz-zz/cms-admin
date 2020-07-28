<template>
	<div class="bg">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model.number="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="" prop="">
					<el-checkbox v-model="ruleForm.checked">同意本站用户协议</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleRegister('ruleForm')">注册</el-button>
				</el-form-item>
			</el-form>
			<div class="footer">
				<div>
					<router-link to="/login">登录账户</router-link>
				</div>
				<div><a href="#">忘记密码？</a></div>
			</div>
		</el-card>
	</div>

</template>

<script>
	import {Admin} from '@/api/index.js';
	
	export default {
		data() {
			//密码验证
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			//确认密码验证
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
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
				ruleForm: {
					username: '',
					password: '',
					checkPass: '',
					fullname: '',
					sex: '',
					tel: '',
					checked: true
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账户',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度不能少于3位',
							trigger: 'blur'
						}
					],
					checkPass: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
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
					}]
				}
			};
		},
		methods: {
			handleRegister(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验通过
					let {status,msg}=await Admin.register({...this.ruleForm});
					if(status){
						//储存Token uid role
						sessionStorage.token=data.token;
						sessionStorage.uid=data.id;
						sessionStorage.role=data.role;
						this.$message.success(msg);
						//跳转路由
						this.$router.replace('/article/list');
					}else{
						this.$message.error(msg);
					}
				});
			},

		}
	}
</script>

<style scoped>
	/* body {
		background: url(../assets/img/login-bg.jpg) no-repeat center center;
		background-size: cover;
		background-attachment: fixed;
	} */
	.bg {
		height: 100vh;
		background: url(../assets/img/psb.jpg) top center no-repeat;
		background-size: cover;
	}

	.box-card {
		width: 350px;
		position: absolute;
		top: 50%;
		right: 40px;
		transform: translate(0, -50%);
	}

	.footer {
		display: flex;
		justify-content: space-between;
	}

	.footer a {
		color: #606266;
		text-decoration: none;
		font-size: 14px;
	}

	.footer a:hover {
		color: #409EFF;
	}
</style>
