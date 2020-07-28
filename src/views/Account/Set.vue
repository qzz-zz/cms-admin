<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户资料</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username" size="small" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="ruleForm.name" size="small"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="role">
			    <el-select v-model="ruleForm.role" placeholder="" size="small">
			      <el-option label="超级管理员" value="" size="small"></el-option>
			      <el-option label="初级管理员" value="" size="small"></el-option>
			    </el-select>
			  </el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="ruleForm.tel" size="small"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email" size="small"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" size="medium">修改资料</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				ruleForm: {
					username: 'admin',
					name: '赵薇',
					role:'超级管理员',
					sex: '女',
					tel: 15863008280,
					email: 'nn880328@126.com'
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
					name: [{
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
					role:[
						{message: '请选择角色类型', trigger: 'change'} 
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
							required: true,
							message: '手机号不能为空'
						},
						{
							type: 'number',
							message: '手机必须为数字值'
						}
					],
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
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('修改成功!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			// 上传头像
			 handleAvatarSuccess(res, file) {
			        this.imageUrl = URL.createObjectURL(file.raw);
			      },
			      beforeAvatarUpload(file) {
			        const isJPG = file.type === 'image/jpeg';
			        const isLt2M = file.size / 1024 / 1024 < 2;
			
			        if (!isJPG) {
			          this.$message.error('上传头像图片只能是 JPG 格式!');
			        }
			        if (!isLt2M) {
			          this.$message.error('上传头像图片大小不能超过 2MB!');
			        }
			        return isJPG && isLt2M;
			      }
		}
	}
</script>

<style>
	/* 头像上传 */
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>
