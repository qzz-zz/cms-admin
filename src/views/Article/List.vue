<template>
	                   <!-- v-loading.lock="isLoading" -->
	<el-card class="box-card">
		<div slot="header">
			<span>文章列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column prop="id" label="#" width="40">
			</el-table-column>
			<el-table-column prop="cate_1st_name" label="一级分类">
			</el-table-column>
			<el-table-column prop="cate_2nd_name" label="二级分类">
			</el-table-column>
			<el-table-column prop="" label="主图">
				<template slot-scope="scope">
					                                <!-- scope.row能够获取这一行的数据 -->
					<el-image style="width: 100px" :src="scope.row.main_photo"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="300">
			</el-table-column>
			<el-table-column prop="create_time" label="发布日期" width="140">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期" width="140">
			</el-table-column>
			<el-table-column prop="" label="操作" width="190">
				<template slot-scope="scope">
					<el-link :href="`#/article/edit/${scope.row.id}`" class="am-margin-right-sm">
						<el-button type="primary" size="mini" icon="el-icon-edit" plain>编辑</el-button>
					</el-link>
				<el-button type="danger" size="mini" icon="el-icon-delete" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import {Article} from "@/api/index";
	export default {
		data() {
			return {
				tableData:[],
				// isLoading:false,
				// loading:'',//声明loading变量
			}
		},
		created(){
			//使用服务的方式调用loading
			// this.loading =this.$loading();
			//获取列表数据
			this.loadList();
		},
		methods:{
			//加载列表数据
			async loadList(){
				// this.isLoading = true;
				//1.没加await async之前
				// Article.list({pagesize:100, pageindex:1});
				//2.加了之后
				let {status, total, data} = await Article.list({pagesize:100, pageindex:1});
				if(status){
					// this.isLoading = false;
					// this.loading.close();
					this.tableData=data;
				}
			}
		}
	}
</script>

<style>
	.am-margin-right-sm {
		margin-right: 10px;
	}
</style>
