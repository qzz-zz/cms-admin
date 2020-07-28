<template>
	<el-card class="box-card">
		<div slot="header">
			<span>管理员列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="fullname" label="姓名">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机" width="115">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="160">
			</el-table-column>
			<el-table-column prop="avatar" label="头像">
				<template slot-scope="scope">
					<el-image style="width: 60px; height: 60px" :src="scope.row.avatar"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作" width="200">
				<template slot-scope="scope">
					<el-link :href="`#/admin/edit/${scope.row.id}`" class="am-margin-right-sm">
						<el-button type="primary" size="mini" icon="el-icon-edit" plain>编辑</el-button>
					</el-link>
					<el-button type="danger" @click="removeAdmin(scope.row.id, scope.$index)" size="mini" icon="el-icon-delete" plain>删除</el-button>
				</template>

			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Admin } from "@/api/index";
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			//获取管理员列表
			async loadList() {
				let { status, total, data } = await Admin.list();
				if (status) {
					this.tableData = data;
					// data.forEach((item) => {
					// 	item.avatar = 'http://localhost:3001' + item.avatar.replace('..', '');
					// });
				}
			},
			//删除管理员
			removeAdmin(id,i){
				this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let {status} = await Admin.remove({id:id});
						if(status){
							//更新DOM
							this.tableData.splice(i,1);
							this.$message.success('删除成功!');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					});
			},
		}
	}
</script>

<style>
	.am-margin-right-sm {
		margin-right: 10px;
	}
</style>
