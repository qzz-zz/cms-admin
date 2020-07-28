<template>
	<el-upload class="avatar-uploader" :headers="headers" action="/upload/common/" :data="{type:'avatar'}" :show-file-list="false"
	 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
		<template v-if="url">
			<img :src="url" class="avatar">
			<i @click.stop="handleRemove" class="el-icon-delete avatar-uploader-remove"></i>
		</template>
		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
	import {Upload} from '@/api/index'
	export default{
		props:['url'],
		data(){
			return {
				headers:{
					Authorization: `Bearer ${sessionStorage.token}`
				}
			}
		},
		methods:{
			//删除
			async handleRemove(){
				//判断是否为默认头像
				let isDefault = this.url.indexOf('default') >= 0;
				if(isDefault){
					this.$emit('remove');
					return false;
				}
				let src = this.url.replace(/.+\/images/,'./images');
				let {status} = await Upload.remove({src});
				if(status){
					this.$message.success("删除成功！");
					this.$emit('remove');
				}
			},
			// 上传头像
			handleAvatarSuccess(res, file, filelist) {
				if (res.status) {
					//不可以在此直接操作ruleForm的数据，这是违法的
					// this.ruleForm.avatar = res.data;
					// this.disabled = true;
					this.$message.success(res.msg);
					//把res传出去 前面是函数 后面res是值
					this.$emit('success',res);
				}
			},
			//上传之前
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
			},
			
			
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

	.avatar-uploader-icon,
	.avatar-uploader-remove {
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
	/*  */
	.avatar-uploader:hover .avatar-uploader-remove{
		display: block;
	}
	.avatar-uploader-remove{
		position: absolute;
		top: 0;
		left: 0;
		display: none;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	
	
</style>
