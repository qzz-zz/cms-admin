<template>
	<div class="counter">
		<button @click="handleDecrease" class="decrease" type="button">-</button>
		<span class="number">{{value}}</span>
		<button @click="handleIncrease" class="increase" type="button">+</button>
	</div>
</template>

<script>
	export default {
		props:['value','min','max'],
		methods:{
			handleIncrease() {
				if(this.value >= this.max){
					return;
				}
				this.$emit('up');
			},
			handleDecrease() {
				if(this.value <= this.min){
					return;
				}
				this.$emit('down');
			},
		},
	}
</script>

<style>
	.counter{
		display: flex;
		align-items: center;
		width: 200px;
	}
	.counter .decrease,
	.counter .increase{
		padding: 6px 20px;
		border: 1px solid #999;
		border-radius: 3px;
		font-size: 18px;
	}
	.counter .decress{
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	.counter .incress{
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}
	.counter .number{
		padding: 6px;
		text-align: center;
		min-width: 100px;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
	}
</style>
