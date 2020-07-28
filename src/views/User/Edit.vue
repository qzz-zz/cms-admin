<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑用户</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username" size="small"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="ruleForm.nickname" size="small"></el-input>
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
			
			<el-form-item>
				<el-button type="primary" @click="saveUser('ruleForm')" size="medium">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import {User} from '@/api/index';
	export default {
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
				ruleForm: {
					id:'',
					username: '',
					nickname: '',
					sex: '',
					tel: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 7,
							message: '长度在 1 到 7 个字符',
							trigger: 'blur'
						}
					],
					nickname: [{
							required: true,
							message: '请输入昵称',
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
				}
			};
		},
		created() {
			this.loadInfo(this.$route.params.id);
		},
		methods: {
			//获取用户个人资料
			async loadInfo(id) {
				let { status, data } = await User.info({ id });
				if(status){
					//数据在表单中显示出来
					this.ruleForm = data;
					this.ruleForm.id=this.$route.params.id;
				}
			},
			//保存修改
			saveUser(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验成功
					let id=this.ruleForm.id;
					let {status, msg } = await User.edit(id,{...this.ruleForm});
					if (status) {
						this.$message.success(msg);
						this.$router.push('/user/list');
					} else {
						this.$message.erro(msg);
					}
				});
			},
		}
	}
</script>

<style>
</style>
