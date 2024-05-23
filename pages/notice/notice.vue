<template>
	<view class="layout" v-if="noticeDetail">
		<view class="header">
			<view class="title">
				{{noticeDetail.title}}
			</view>
			<view class="row">
				<view class="author">
					{{noticeDetail.author}}
				</view>
				<view class="date">
					{{noticeDetail.publish_date}}
				</view>
			</view>
		</view>
		<view class="section">
			<view class="content">
				<mp-html :content="noticeDetail.content" />
			</view>
			<view class="count">
				{{"阅读 " + noticeDetail.view_count}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import { apiGetNoticeDetail } from "@/api/apis.js"
	
	const noticeId = ref(null);
	const noticeDetail = ref(null);
	
	const getNoticeDetail = async ()=>{
		let res = await apiGetNoticeDetail({id:noticeId.value})
		noticeDetail.value  = res.data;
	}
	onLoad((e)=>{
		noticeId.value = e.id;
		getNoticeDetail();
	})
</script>

<style lang="scss" scoped>
	.layout {
		padding: 30rpx;
		.header {
			.title {
				font-size: 40rpx;
				padding: 30rpx 0;
				font-weight: 600;
			}
			.row {
				display: flex;
				color: $text-font-color-3;
				padding: 5rpx 0;
				.date {
					margin-left: 10rpx;
				}
			}
		}
		.section {
			margin-top: 30rpx;
			.count {
				color: $text-font-color-3;
				margin-top: 30rpx;
				margin-left: -10rpx;
				font-size: 24rpx;
			}
		}
	}
</style>