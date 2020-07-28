<template>
	<el-card class="box-card">
		<div slot="header">
			<span>穿梭框组件</span>
		</div>
		<Transfer @leftClick="leftClick()" @rightClick="rightClick()" :list1="list1" :list2="list2"></Transfer>
	</el-card>
</template>

<script>
	import Transfer from '@/components/Transfer.vue';
	export default{
		components:{
			Transfer
		},
		data(){
			return{
				list1:[
					{id:1,name:'备选项1',checked:false},
					{id:2,name:'备选项2',checked:false},
				],
				list2:[
					{id:3,name:'备选项3',checked:false},
					{id:4,name:'备选项4',checked:false},
				]
			}
		},
		methods:{
			//左移
			leftClick(){
				// console.log('ddd');
				for(let i=0;i<this.list2.length;i++){
					let list=this.list2[i];
					if(list.checked){
						list.checked=false;
						this.list2.splice(i,1);
						this.list1.push(list);
						i=i-1;
					}
				}
			
			},
			//右移
			rightClick(){
				// console.log('ddd');
				for(let i=0;i<this.list1.length;i++){
					let list=this.list1[i];
					if(list.checked){
						list.checked=false;
						this.list1.splice(i,1);
						this.list2.push(list);
						i=i-1;
					}
				}
			}
		}
	}
</script>

<style>
</style>
