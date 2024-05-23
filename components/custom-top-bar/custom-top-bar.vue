<template>
	<view class="layout">
		<view class="topbar pageBg">
			<view class="place" :style="{height:statusBarHeight + 'px'}">
				
			</view>
			<view class="bar" :style="{height:menuHeight + 'px'}">
				<view class="barTitle" :style="{marginLeft:tikTokIconLeft + 'px'}">
					{{props.title}}
				</view>
				<view class="barSearch" @click="goPageSearch">
					<uni-icons type="search" class="iconSearch"  size="20"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>
		<view class="fill" :style="{height:statusBarHeight + menuHeight + 'px'}">
			
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {getStatusBarHeight,getMenuHeight,getLeftIconLeft} from "@/utils/system.js"
// 获取头部状态栏高度
let statusBarHeight = ref(getStatusBarHeight());
// 获取小程序菜单栏按钮高度
let menuHeight = ref(getMenuHeight());
// 获得抖音icon宽度
let tikTokIconLeft = ref(getLeftIconLeft())

const props = defineProps({
	title:{
		type:String,
		default:"壁纸"
	}
})
const goPageSearch = ()=>{
	uni.navigateTo({
		url:"/pages/search/search"
	})
}
</script>

<style lang="scss" scoped>
.layout {
	.topbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		.place {
			// height: 80rpx;
		}
		.bar {
			display: flex;
			align-items: center;
			// border: solid red;
			padding-left: 30rpx;
			.barTitle {
				font-size: 40rpx;
				font-weight: 700;
			}
			.barSearch {
				width: 240rpx;
				background-color: #fff;
				border-radius: 80rpx;
				padding: 5rpx 20rpx;
				margin-left: 30rpx;
				display: flex;
				align-items: center;
				color: $text-font-color-3;
				.text {
					padding-left: 10rpx;
				}
			}
			
		}
	}
	
}
</style>