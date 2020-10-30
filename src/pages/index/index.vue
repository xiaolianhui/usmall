<template>
	<div>
		<el-container class="box1">
			<el-aside width="200px">
				<!-- 左侧导航 -->
				<el-menu router default-active="/index/home" unique-opened class="el-menu-vertical-demo" background-color="#20222a"
				 text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="/index/home" width='100px'>
						<i class="el-icon-menu"></i>
						<span slot="title">首页</span>
					</el-menu-item>


					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-setting"></i>
							<span>系统设置</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/index/menu">菜单管理</el-menu-item>
							<el-menu-item index="/index/role">角色管理</el-menu-item>
							<el-menu-item index="/index/manger">管理员管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-goods"></i>
							<span>商城设置</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/index/classify">商品分类</el-menu-item>
							<el-menu-item index="/index/specs">商品规格</el-menu-item>
							<el-menu-item index="/index/goods">商品管理</el-menu-item>
							<el-menu-item index="/index/member">会员管理</el-menu-item>
							<el-menu-item index="/index/banner">轮播图管理</el-menu-item>
							<el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<span>admin</span>
					<span class="el-icon-setting"> </span>
				</el-header>
				<el-main>
							<!-- 面包屑 -->
							<el-breadcrumb v-if="$route.name" separator-class="el-icon-arrow-right">
								<el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
								<el-breadcrumb-item >{{$route.name}}</el-breadcrumb-item>
							</el-breadcrumb>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {};
		},
		methods: {},
		mounted() {},
	};
</script>
<style scoped>
	.el-header {
		background-color: #b3c0d1;
		color: #333;
		text-align: right;
		line-height: 60px;
	}

	.el-aside {
		height: 100%;
		background-color: #b3c0d1;
		color: #333;
		line-height: 200px;
	}
	.box1{
		width: 100vw;
		height: 100vh;
	}
	.el-main {
		background-color: #fff;
		color: #333;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 199px;
		height: 100vh;
	}

	.el-submenu .el-menu-item {
		height: 50px;
		line-height: 50px;
		padding: 0 45px;
		min-width: 199px;
	}

	.el-icon-setting {
		font-size: 20px;
	}
</style>
