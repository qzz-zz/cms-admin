<template>
	<el-card class="box-card" style="width: 50%">
		<div slot="header">
			<span>管理员角色</span>
			<el-button type="primary" @click="openInsertModal" plain icon="el-icon-circle-plus-outline" style="float: right;">添加角色</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column label="分类">
				<template slot-scope="scope">
					<el-tag>{{scope.row.name}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" @click="editRole(scope.row.id, scope.row.name, scope.$index)" size="mini" icon="el-icon-edit" plain>编辑</el-button>
					<el-button type="danger" @click="removeRole(scope.row.id, scope.$index)" size="mini" icon="el-icon-delete" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Role } from "@/api/index";
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
			async loadList() {
				let { status, total, data } = await Role.list();
				if (status) {
					this.tableData = data;
				}
			},
			//添加角色
			openInsertModal() {
				this.$prompt('请输入添加的角色名称', '添加角色', {
						inputPattern: /\S/,
						inputErrorMessage: '输入不能为空白字符'
					})
					.then(async ({ value }) => {
						//console.log(value); //输出输入框里的值
						let { status, data } = await Role.insert({ name: value });
						if (status) {
							//手动更新DOM
							this.tableData.push({ name: value, ...data }); //...data是为了把data数据展开得到里面的id操作列
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					});
			},
			//删除角色
			removeRole(id,i) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let {status} = await Role.remove(id);
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
			//编辑角色
			editRole(id,name,i){
				this.$prompt('请输入编辑的角色名称', '编辑角色', {
						inputPattern: /\S/,
						inputErrorMessage: '输入不能为空白字符',
						inputValue:name,
					})
					.then(async ({value}) => {
						let { status } = await Role.edit(id,{name:value});
						if (status) {
							//手动更新DOM
							this.tableData[i].name = value; 
							this.$message.success('编辑成功');
						}
					})
					.catch(() => {
						this.$message.info('取消编辑');
					});
			}
		}
	}
</script>

<style>
</style>
