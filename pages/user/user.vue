<template>
	<view class="userLayout pageBg" v-if="userInfo">

		<view class="userInfo">
			<view class="avatar">
				<image src="../../common/images/05.jpg" mode="aspectFill"></image>
			</view>
			<view class="ip">
				{{userInfo.IP}}
			</view>
			<view class="address">
				来自：{{userInfo.address.city ||  userInfo.address.province || userInfo.address.country}}
			</view>
		</view>
		<view class="section">

			<navigator url="/pages/classlist/classlist?type=download">
				<view class="sectionItem">
					<view class="left">
						<uni-icons type="download-filled" size="24"></uni-icons>
						<view class="text">
							我的下载
						</view>
					</view>
					<view class="right">
						<view class="text">
							{{userInfo.downloadSize}}
						</view>
						<uni-icons type="right" size="20"></uni-icons>

					</view>
				</view>
			</navigator>
			<navigator url="/pages/classlist/classlist?type=score">
				<view class="sectionItem">
					<view class="left">
						<uni-icons type="star-filled" size="24"></uni-icons>
						<view class="text">
							我的评分
						</view>
					</view>
					<view class="right">
						<view class="text">
							{{userInfo.scoreSize}}
						</view>
						<uni-icons type="right" size="20"></uni-icons>
			
					</view>
				</view>
			</navigator>
			<view class="sectionItem">
				<view class="left">
					<uni-icons type="download-filled" size="24"></uni-icons>
					<view class="text">
						联系客服
					</view>
				</view>
				<view class="right">
					<uni-icons type="right" size="20"></uni-icons>
				</view>
				<!-- #ifdef MP -->
				<button class="contact" open-type="contact">客服</button>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<button class="contact" open-type="contact" @click="mackPhone">拨打电话</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="section" @click="goPageSubscribe">
			<view class="sectionItem">
				<view class="left">
					<uni-icons type="notification-filled" size="30"></uni-icons>
					<view class="text">
						订阅更新
					</view>
				</view>
				<view class="right">
					<uni-icons type="right" size="20"></uni-icons>

				</view>
			</view>
			<view class="sectionItem" @click="goPageQuestion">
				<view class="left">
					<uni-icons type="help-filled" size="30"></uni-icons>
					<view class="text">
						常见问题
					</view>
				</view>
				<view class="right">
					<uni-icons type="right" size="20"></uni-icons>
			
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		apiGetUserInfo
	} from "@/api/apis.js"

	const userInfo = ref(null);
	
	const getUserInfo = async()=>{
		let res = await apiGetUserInfo();
		userInfo.value = res.data;
		console.log("userinfo",userInfo)
	}

	const mackPhone = () => {
		console.log("start mackPhone")
		uni.makePhoneCall({
			phoneNumber: "114"
		})
	}
	const goPageSubscribe = ()=>{
		uni.navigateTo({
			url:"/pages/notice/notice?id=" + "65361e318b0da4ca084e3ce0"
		})
	}
	const goPageQuestion = ()=>{
		uni.navigateTo({
			url:"/pages/notice/notice?id=" + "6536358ce0ec19c8d67fbe82"
		})
	}
	
	getUserInfo();
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			padding: 140rpx 0 60rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avatar {
				width: 160rpx;
				height: 160rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.ip {
				margin-top: 40rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: $text-font-color-1;
			}

			.address {
				font-size: 30rpx;
				margin-top: 24rpx;
				color: $text-font-color-2;
			}

		}

		.section {
			margin-left: 30rpx;
			margin-right: 30rpx;
			border: solid 1px rgb(0, 0, 0, 0.05);
			box-shadow: 0 0 30rpx rgb(0, 0, 0, 0.1);
			margin-top: 50rpx;

			.sectionItem {
				position: relative;
				display: flex;
				width: 100%;
				height: 100rpx;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				border-bottom: 1px solid rgb(0, 0, 0, 0.1);
				line-height: 100rpx;

				.left {
					display: flex;

					:deep() {
						.uni-icons {
							color: $brand-theme-color !important;
							;
						}
					}

					.text {
						font-size: 32rpx;
						margin-left: 30rpx;
					}
				}

				.right {
					display: flex;
					gap: 5rpx;
					.text {
						color: $text-font-color-3;
					}
					:deep() {
						.uni-icons {
							color: $text-font-color-3 !important;
							;
						}
					}
				}

				.contact {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					opacity: 0;
				}
			}

			.sectionItem:last-child {
				border: none;
			}
		}
	}
</style>