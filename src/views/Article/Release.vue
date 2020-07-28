<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布文章</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input v-model="ruleForm.description"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-col :span="6">
					<!-- *****************二级联动******************** -->
					<el-select v-model="ruleForm.cate_1st" placeholder="请选择一级分类">
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="ruleForm.cate_2nd" placeholder="请选择二级分类">
						<el-option v-for="option in options_2nd" :key="option.id"  :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="主图" prop="main_photo">
				<!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
				<single-upload :url="ruleForm.main_photo" @success="handleUploadSuccess" @remove="ruleForm.main_photo='' "></single-upload>
				
			</el-form-item>

			<el-form-item label="内容" prop="content">
				<div v-model="ruleForm.content" ref="editor"></div>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="saveForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	// wangEditor
	import E from 'wangeditor';
	import {Category,Article} from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		components:{
			SingleUpload
		},
		data() {
			return {
				ruleForm: {
					title: '',
					cate_1st:'',
					cate_2nd:'',
					description: '',
					content: '',
					main_photo: '',
				},
				//声明两个数组
				options_1st:[],
				options_2nd:[],
				rules: {
					title: [{
							// required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 1,
							message: '长度不少于1个字符',
							trigger: 'blur'
						}
					],
					describe: [{
							// required: true,
							message: '请输入描述',
							trigger: 'blur'
						},
						{
							min: 1,
							message: '长度不少于1个字符',
							trigger: 'blur'
						}
					],
				}
			};
		},
		async created(){
			// 获取一级分类的数据
			let options= await this.loadSubcate(0).then((options) => {
				this.options_1st = options;
			});
		},
		watch:{
			"ruleForm.cate_1st":async function (val) {
				//获取二级分类数据
				let options= await this.loadSubcate(val);
				this.options_2nd=options;
				//默认选中第一项
				this.ruleForm.cate_2nd=options[0].id;
			}
		},
		//wangEditor
		mounted() {
			//console.log(this.$refs.editor);
			var editor = new E(this.$refs.editor)
			// 同步form数据
			editor.customConfig.onchange = (html) => {
				this.ruleForm.content = html
			}
			//配置图片上传API接口
			editor.customConfig.uploadImgServer='/upload/editor/';
			//配置自定义filename
			editor.customConfig.uploadFileName='file';
			//自定义Header
			editor.customConfig.uploadImgHeaders={
				Authorization:`Bearer ${sessionStorage.token}`
			}
			editor.create()
		},
		methods: {
			//获取子分类
			async loadSubcate(id){
				let {status,data} =await Category.subcate({id});//id
				return data;
			},
	
			saveForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验成功
					let { status, msg } = await Article.add({ ...this.ruleForm });
					if (status) {
						this.$message.success(msg);
						this.$router.push('/article/list');
					} else {
						this.$message.erro(msg);
					}
				});
			},
			//头像上传成功
			handleUploadSuccess({status, msg, data}){
				this.ruleForm.main_photo=data;
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
