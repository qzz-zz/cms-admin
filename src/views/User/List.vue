<template>
	<el-card class="box-card">
		<div slot="header">
			<span>用户列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机">
			</el-table-column>
			<el-table-column prop="" label="操作" width="200">
				<template slot-scope="scope">
					<el-link :href="`#/user/edit/${scope.row.id}`" class="am-margin-right-sm">
						<el-button type="primary" size="mini" icon="el-icon-edit" plain>编辑</el-button>
					</el-link>
					<el-button type="danger" @click="removeUser(scope.row.id, scope.$index)" size="mini" icon="el-icon-delete">删除</el-button>
				</template>

			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from "@/api/index";
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
			//获取用户列表
			async loadList() {
				let { status, total, data } = await User.list({});
				if (status) {
					this.tableData = data;
				}
			},
			//删除角色
			removeUser(id,i) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let {status} = await User.remove(id);
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
