<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>分类列表</span>
		</div>
		<!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
		<el-tree :data="data" node-key="id" :expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
				<span>
					<el-button type="text" size="mini" @click="() => edit(data)" icon="el-icon-edit">
						编辑
					</el-button>
					<el-button type="text" size="mini" @click="() => append(data)" icon="el-icon-plus">
						添加
					</el-button>
					<el-button type="text" size="mini" @click="() => remove(node, data)" icon="el-icon-delete">
						删除
					</el-button>
				</span>
			</span>
		</el-tree>
	</el-card>

</template>

<script>
	let id = 1000;
	export default {
		data() {
			const data = [{
				id: 1,
				label: '全部分类',
				children: [{
						id: 2,
						label: '科技',
						children: [{
							id: 6,
							label: '人工智能',
							children: [{
								label: '人工智能1',
							}, {
								label: '人工智能2',
							}]
						}, {
							id: 7,
							label: '黑客技术',
							children: [{
								label: '黑客技术1',
							}, {
								label: '黑客技术2',
							}]
						}]
					}, {
						id: 3,
						label: '娱乐',
						children: [{
							id: 8,
							label: '娱乐1'
						}, {
							id: 9,
							label: '娱乐2'
						}]
					},
					{
						id: 4,
						label: '编程',
						children: [{
							id: 10,
							label: '前端',
							children: [{
								label: '前端1',
							}, {
								label: '前端2',
							}]
						}, {
							id: 11,
							label: 'JAVA',
							children: [{
								label: 'JAVA1',
							}, {
								label: 'JAVA2',
							}]
						}, {
							id: 12,
							label: 'PHP',
							children: [{
								label: 'PHP1',
							}, {
								label: 'PHP2',
							}]
						}]
					},
					{
						id: 5,
						label: '设计',
						children: [{
							id: 13,
							label: '设计1'
						}, {
							id: 14,
							label: '设计2'
						}]
					}
				]
			}];
			return {
				data: JSON.parse(JSON.stringify(data))
			}
			// defaultProps: {
			// 	children: 'children',
			// 	label: 'label'
			// }
		},
		methods: {
			edit(data) {

			},
			append(data) {
				const newChild = {
					id: id++,
					label: 'testtest',
					children: []
				};
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},
			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			}
		}
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
