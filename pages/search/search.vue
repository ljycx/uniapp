<template>
	<view class="layout">
		<view class="searchBar">
			<uni-search-bar @confirm="search" :focus="true" v-model="queryParams.keyword" @blur="blur" @focus="focus"
				@input="input" @cancel="cancel" @clear="clear">
			</uni-search-bar>
		</view>
		<view class="historySearch" v-if="historyList.length && !picList.length">
			<view class="titleBar">
				<view class="title">
					最近搜索
				</view>
				<view class="icon" @click="clearHistoryList">
					<uni-icons type="trash-filled" size="24" color="rgb(115, 115, 115)"></uni-icons>
				</view>
			</view>
			<view class="historyList">
				<uni-tag :text="item" v-for="item in historyList" @click="handleTag(item)" </uni-tag>
			</view>
		</view>
		<view class="hotSearch" v-if="!picList.length">
			<view class="titleBar">
				<view class="title">
					热门搜索
				</view>
			</view>
			<view class="historyList">
				<uni-tag :text="item" v-for="item in hotList" @click="handleTag(item)" </uni-tag>
			</view>
		</view>
		<view class="picList">
			<view class="picItem" v-for="item in picList" :key="item._id" @click="goPagePreview(item._id)">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</view>
		</view>
		<view class="loadLayout" v-if="!isData && picList.length">
			<uni-load-more :status="'noMore'"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import {
		onLoad,onReachBottom
	} from "@dcloudio/uni-app"

	import {
		apiGetSearchWall
	} from "@/api/apis.js"

	let storageHistoryList = uni.getStorageSync("storageHistoryList") || [];
	const historyList = ref(storageHistoryList);
	const hotList = ref(["美女", "ai"])
	const picList = ref([]);
	const isData = ref(true);
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})

	const search = (res) => {
		// uni.showToast({
		// 	title: '搜索：' + res.value,
		// 	icon: 'none'
		// })

		let item = new Set([res.value, ...historyList.value])
		historyList.value = [...item];
		uni.setStorageSync("storageHistoryList", historyList.value);
		getSearchWall();
	}
	const handleTag = (keyword)=>{
		queryParams.value.keyword = keyword;
		search({value:keyword});
	}
	const input = (res) => {
		console.log('----input:', res)
	}
	const clear = (res) => {
		uni.showToast({
			title: 'clear事件，清除值为：' + res.value,
			icon: 'none'
		})
	}
	const blur = (res) => {
		// uni.showToast({
		// 	title: 'blur事件，输入值为：' + res.value,
		// 	icon: 'none'
		// })
	}
	const focus = (e) => {
		// uni.showToast({
		// 	title: 'focus事件，输出值为：' + e.value,
		// 	icon: 'none'
		// })
	}
	const initData = () => {
		queryParams.value.keyword = "";
		queryParams.value.pageNum = 1;
		picList.value = [];
	}
	const cancel = (res) => {
		initData();
		// uni.showToast({
		// 	title: '点击取消，输入值为：' + res.value,
		// 	icon: 'none'
		// })
	}
	const clearHistoryList = () => {
		uni.showModal({
			title: "请选择",
			content: "确认清除吗"
		}).then((sus) => {
			if (sus.confirm) {
				historyList.value = [];
			}
		})
	}
	const getSearchWall = async () => {
		uni.showLoading({
			title:"加载中"
		})
		let res = await apiGetSearchWall(queryParams.value);
		picList.value = [...picList.value,...res.data];
		console.log("比较",queryParams.value.pageSize,res.data.length)
		if(queryParams.value.pageSize>res.data.length) isData.value = false;
		uni.hideLoading();
		uni.setStorageSync("storage_classList",picList.value);
	}
	const goPagePreview = (id)=>{
		uni.navigateTo({
			url:"/pages/preview/preview?id=" + id
		})
	}
	onReachBottom(()=>{
		if(!isData.value) return;
		queryParams.value.pageNum++;
		getSearchWall();
	})
</script>


<style lang="scss" scoped>
	.layout {
		padding: 30rpx;

		.historySearch,
		.hotSearch {

			.titleBar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;

				.title {
					color: $text-font-color-3;
				}

				.icon {}
			}

			.historyList {
				display: flex;
				flex-wrap: wrap;
				gap: 20rpx;

			}
		}

		.picList {
			margin-top: 30rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 8rpx;

			.picItem {
				height: 340rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>