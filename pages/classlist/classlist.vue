<template>
	<view class="classListLayout">
		<view class="loadLayout" v-if="!classList.length">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="pic-item" v-for="item in classList" :key="item._id">
				<image class="image" :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadLayout" v-if="classList.length">
			<uni-load-more :status="isData ? 'loading' : 'noMore'"></uni-load-more>
		</view>
		<!-- 底部安全距离 -->
		<view class="place-safe-bottom">
			
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  {apiGetClassList,apiGetUserWallList} from "@/api/apis.js"
import {onLoad,onReachBottom}from "@dcloudio/uni-app"

const classList = ref([]);
const isData = ref(true);
const classQueryParams = {
	pageNum:1,
	pageSize:12
};

const getClass = async()=>{
	let res;
	if(classQueryParams.classid) res = await apiGetClassList(classQueryParams);
	if(classQueryParams.type) res = await apiGetUserWallList(classQueryParams);
	
	classList.value = [...classList.value,...res.data];
	console.log("start getClass")
	if(classQueryParams.pageSize > res.data.length) {
		isData.value = false;
		console.log("isData为false了")
	}
	uni.setStorageSync("storage_classList",classList.value);
}


onLoad((e)=>{
	// console.log("life classlist onload")
	// console.log("e:",e)
	if(e.id) classQueryParams.classid = e.id;
	if(e.type) classQueryParams.type = e.type;
	getClass();
	
})
onReachBottom(()=>{
	if(!isData.value) return;
	classQueryParams.pageNum++;
	getClass();
})

</script>

<style lang="scss">
.classListLayout {
	.content {
		padding: 5rpx;
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		.pic-item {
			height: 440rpx;
			.image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.loadLayout {
		// border: solid;
		padding: 10rpx 0;
	}
}
</style>
