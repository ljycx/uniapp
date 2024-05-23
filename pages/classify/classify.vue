<template>
	<view class="layout pageBg">
		<custom-top-bar title="分类"></custom-top-bar>
		<view class="classifyList">
			<theme-item v-for="item in classifyList" :key="item._id" :classifyItem="item"></theme-item>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	
	import {
		apiGetClassify
	} from "@/api/apis.js";
	
	const classifyList = ref([]);
	const queryParams = {
		pageNum:1,
		pageSize:50
	}
	
	const getClassify = async () => {
		const res = await apiGetClassify(queryParams);
		classifyList.value = res.data;
	}
	
	getClassify();
</script>

<style lang="scss">
	.layout {

		.classifyList {
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 15rpx;
		}
	}
</style>