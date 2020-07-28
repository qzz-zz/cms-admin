<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑文章</span>
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
					<el-select v-model="ruleForm.cate_1st" @change="handleCate_1stChange" placeholder="请选择一级分类">
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
					<img v-if="ruleForm.main_photo" :src="ruleForm.main_photo" class="avatar">
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
		props:['id'],
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
		created(){
			this.loadSubcate(0).then((options) => {
				this.options_1st = options;
			});
			this.loadDetail(this.id);
		},
		
		watch:{
			//watch会无时无刻地监听cate_1st的数值变化
			"ruleForm.cate_1st":function(val){
				this.loadSubcate(val).then((options) => {
					this.options_2nd = options;
					// if(this.ruleForm.cate_2nd){
					// 	this.ruleForm.cate_2nd = options[0].id;
					// }
				});
			},
			"ruleForm.cate_2nd":function(val){
				// console.log(val);
			}
			 
		},
		//wangEditor
		async mounted() {
			// 获取一级分类
			this.options_1st = await this.loadSubcate(0);
			// 获取文章详情
			let article =await this.loadDetail(this.id);
			this.ruleForm=article;
			// 获取二级分类
			this.options_2nd= await this.loadSubcate(article.cate_1st);
			
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.ruleForm.content = html
			}
			editor.create()
			editor.txt.html(this.ruleForm.content)
		},
		methods: {
			//获取文章详情
			async loadDetail(id){
				let { status, data } = await Article.detail({ id });
				if (status) {
					// this.ruleForm = data;
					return data;
				}
			},
			//获取子分类
			async loadSubcate(id){
				let {status,data} =await Category.subcate({id});//id
				if(status){
					return data;
				}
			},
			// 一级分类
			async handleCate_1stChange(val){
				let options_2nd= await this.loadSubcate(article.cate_1st);
				this.options_2nd = options;
				this.ruleForm.cate_2nd = options[0].id;
			},
			
			//保存修改
			saveForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验成功
					let { status, msg } = await Article.edit({ ...this.ruleForm });
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
