<template>
	<div class="transfer">
		<div class="panel">
			<p class="panel_header">
				<input type="checkbox">
				<span class="checkbox_label">列表1</span>
				<span class="checkbox_sel">
					<span>0</span>
					<span>/</span>
					<span>14</span>
				</span>
			</p>
			<div class="panel_body">
				<label v-for="(item,index) in list1" class="panel_item">
					<input @click="item.checked = !item.checked" type="checkbox">
					<span class="checkbox_label">{{item.name}}</span>
				</label>
			</div>
		</div>
		<div class="buttons">
			<button @click="$emit('leftClick')"> < </button> 
			<button @click="$emit('rightClick')"> > </button>
		</div>
		<div class="panel">
			<p class="panel_header">
				<span class="checkbox_input">
					<input type="checkbox">
				</span>
				<span class="checkbox_label">列表2</span>
				<span class="checkbox_sel">
					<span>0</span>
					<span>/</span>
					<span>14</span>
				</span>
			</p>
			<div class="panel_body">
				<label  v-for="(item,index) in list2" class="panel_item">
					<input @click="item.checked = !item.checked" type="checkbox">
					<span class="checkbox_label">{{item.name}}</span>
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['list1','list2'],
		
	}
</script>

<style>
	.transfer {
		display: inline-block;
		width: 100%;
	}

	.panel {
		border: 1px solid #ebeef5;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		display: inline-block;
		vertical-align: middle;
		width: 200px;
		max-height: 100%;
		box-sizing: border-box;
		position: relative;
	}

	.panel .panel_header {
		height: 40px;
		line-height: 40px;
		background: #f5f7fa;
		margin: 0;
		padding-left: 15px;
		border-bottom: 1px solid #ebeef5;
		box-sizing: border-box;
		color: #000;
	}

	input {
		cursor: pointer;
		outline: none;
		line-height: 1;
		vertical-align: middle;
	}

	.panel .panel_header .checkbox_label {
		font-size: 16px;
		color: #303133;
		font-weight: 400;
	}

	.panel .panel_header .checkbox_sel {
		position: absolute;
		right: 15px;
		color: #909399;
		font-size: 12px;
		font-weight: 400;
	}

	.panel .panel_body {
		height: 246px;
		margin: 0;
		padding: 6px 0;
		list-style: none;
		height: 246px;
		overflow: auto;
		box-sizing: border-box;
	}

	.panel .panel_body .panel_item {
		color: #606266;
		font-weight: 500;
		font-size: 14px;
		position: relative;
		cursor: pointer;
		display: inline-block;
		margin-right: 30px;
		padding-left: 15px;
		height: 30px;
		line-height: 30px;
	}

	.buttons {
		display: inline-block;
		vertical-align: middle;
		padding: 0 30px;
	}

	.buttons button {
		width: 56px;
		height: 40px;
		color: #fff;
		background-color: #a0cfff;
		border-color: #a0cfff;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		outline: none;
		border: 1px solid #dcdfe6;
		cursor: pointer;
		margin-left: 10px;
	}
</style>
