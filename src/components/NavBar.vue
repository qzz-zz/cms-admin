<template>
	<div class="navbar">
		<div class="left">
			<div>
				<img src="@/assets/img/logo.png" alt="">
			</div>
			<div>
				<i class="el-icon-s-fold"></i>
			</div>
		</div>
		<!-- 下拉菜单 -->
		<div class="right">
			<el-dropdown>

				<span class="el-dropdown-link" style="color: #fff;">
					<div class="img">
						<img src="../assets/img/avatar.png" alt="">
					</div>
					赵薇<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item disabled>双皮奶</el-dropdown-item>
					<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>

</script>

<style>
	.navbar {
		background-color: #31404e;
		color: #fff;
		height: 60px;
		line-height: 60px;
		/* padding-left: 15px; */
		display: flex;
		justify-content: space-between;
	}

	.navbar .left {
		display: flex;
	}

	.navbar .left img {
		height: 60px;
		margin-left: 20px;
	}

	.navbar .right {
		padding-right: 40px;
		color: #fff;
	}

	.navbar .right .img{
		height: 40px;
		width: 40px;
		margin-right: 10px;
	}
	.navbar .right img {
		height: 40px;
		width: 40px;
	}

	.el-dropdown-link {
		cursor: pointer;
		 display: flex;
		 align-items: center;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
