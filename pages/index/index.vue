<template>
	<view class="homeLayout pageBg">
		<custom-top-bar title="推荐"></custom-top-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="rgb(255,255,255)"
				autoplay circul>
				<swiper-item v-for="item in homeBannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<view class="text">公告</view>
			</view>
			<view class="center">
				<swiper autoplay vertical circular duration="300" interval="2000">
					<swiper-item v-for="item in noticeList" :key="item._id" @click="goPageNotice(item._id)">
						{{item.title}}
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>
					<view class="title">每日推荐</view>
				</template>
				<template #custom>
					<view class="data">
						<uni-icons type="calendar" size="24" color="rgb(40, 180, 141)"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="(item,index) in randomWallList" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill" @click="previewImg(index)"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					<view>专题精选</view>
				</template>
				<template #custom>
					<view>
						<view class="text">
							More+
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :classifyItem="item" :key="item._id"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		apiGetHomeBanner,
		apiGetRandomWall,
		apiGetNotice,
		apiGetClassify
	} from "@/api/apis.js";
	import {
		onShareAppMessage
	} from "@dcloudio/uni-app"


	const homeBannerList = ref([]);
	const randomWallList = ref([]);
	const noticeList = ref([]);
	const classifyList = ref([]);

	const getHomeBanner = async () => {
		const res = await apiGetHomeBanner();
		homeBannerList.value = res.data;
	}
	const getRandomWall = async () => {
		const res = await apiGetRandomWall();
		randomWallList.value = res.data;
	}
	const getNotice = async () => {
		const res = await apiGetNotice({
			select: true
		});
		noticeList.value = res.data;
	}
	const getClassify = async () => {
		const res = await apiGetClassify({
			select: true
		});
		classifyList.value = res.data;
	}
	const goPageNotice = (id) => {
		console.log("go pageNotice e", id)
		uni.navigateTo({
			url: "/pages/notice/notice?id=" + id,
		})

	}
	const previewImg = (index) => {
		let imgUrls = randomWallList.value.map((item)=>{
			return item.smallPicurl;
		}) 
		uni.previewImage({
			urls:imgUrls,
			current:index
		})
	}

	getHomeBanner();
	getRandomWall();
	getNotice();
	getClassify();
	onShareAppMessage(() => {
		return {
			title: "夏娜壁纸",
			path: "/pages/index/index"
		}
	})
</script>

<style lang="scss" scoped>
	.homeLayout {
		// $debug_border: solid red;
		$debug_border: none;
		$xn-primary-color: rgb(40, 180, 141);

		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				swiper-item {
					padding: 0 30rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}

		.notice {
			width: 690rpx;
			// border: solid;
			background-color: rgba(0, 0, 0, .05);
			margin: 0 auto;
			display: flex;
			height: 80rpx;
			line-height: 80rpx;

			.left {
				width: 140rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					color: $brand-theme-color;

				}

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

				font-size: 24rpx;
				font-weight: 600;
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						width: 100%;
						color: $text-font-color-3;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.right {
				width: 70rpx;
			}
		}

		.select {
			border: $debug_border;

			margin-top: 50rpx;

			.content {
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					width: 100%;
					white-space: nowrap;

					.box {
						display: inline-block;
						width: 200rpx;
						height: 430rpx;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 15rpx;
						}
					}

					.box:nth-last-child(1) {
						margin-right: 30rpx;
					}
				}
			}
		}

		.data {
			display: flex;
			justify-content: center;
			align-items: center;
			color: $brand-theme-color;

			.text {
				font-size: 30rpx;
				margin-left: 5rpx;
			}
		}


		.title {
			color: $text-font-color-1;
		}

		.theme {
			margin-top: 50rpx;
			padding-bottom: 50rpx;

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>