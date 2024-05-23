<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id=' + props.classifyItem._id" class="box" v-if="!props.isMore">

			<image class="pic" :src="props.classifyItem.picurl" mode="aspectFill"></image>
			<view class="top">
				{{timeTitle}}
			</view>
			<view class="mask">
				{{props.classifyItem.name}}
			</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="switchTab" class="box more" v-if="props.isMore">
			<image class="pic" src="../../common/images/05.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="30" color="rgb(255,255,255)"></uni-icons>
				<view class="text">
					更多
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import {
		getTimeAgo
	} from "@/utils/common.js"

	const props = defineProps({
		isMore: {
			type: Boolean,
			default: false
		},
		classifyItem: {
			type: Object,
			default () {
				return {
					name: "动漫少女",
					picurl: "https://raw.githubusercontent.com/oOzhuoxiaOo/PicGo/main/test/Project-01.jpg",
					updateTime: Date.now(),
					id:"6524a48f6523417a8a8b825d",
				}
			}
		}
	})
	console.log("props:",props)
	const timeTitle = ref(getTimeAgo(props.classifyItem.updateTime))
</script>

<style lang="scss">
	.themeItem {
		.box {
			position: relative;
			height: 340rpx;
			overflow: hidden;
			border-radius: 10rpx;

			.pic {
				width: 100%;
				height: 100%;
			}

			.top {
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgb(215, 120, 88);
				padding: 5rpx 10rpx;
				font-size: 16rpx;
				color: rgb(255, 255, 255);
				border-radius: 0 0 16rpx 0;
			}

			.mask {
				width: 100%;
				height: 70rpx;
				font-size: 30rpx;
				color: rgb(255, 255, 255);
				font-weight: 600;
				position: absolute;
				left: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.2);
				// z-index: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				backdrop-filter: blur(20rpx);

			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				font-size: 30rpx;
				color: rgb(255, 255, 255);
				font-weight: 600;
				position: absolute;
				left: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.2);
				// z-index: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				backdrop-filter: blur(20rpx);
			}
		}
	}
</style>