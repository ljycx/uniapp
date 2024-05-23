<template>
	<view class="previewLayout">
		<div class="content">
			<swiper  v-if="currentInfo" circular :current="currentIndex" @change="handleSwiper">
				<swiper-item v-for="(item,index) in classList" :key="item._id">
					<image :src="item.picurl" v-if="Math.abs(currentIndex - index) < 2" @click="toogleMask"
						mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="mask" v-show="isMask">
				<view class="goback" @click="goBack">
					<uni-icons type="left" size="20" color="#fff"></uni-icons>
				</view>
				<view class="pic-idx">
					{{currentIndex + 1 + "/" + classList.length}}
				</view>
				<view class="time">
					<uni-dateformat :date="Date.now()" format="hh:mm" />
				</view>
				<view class="date">
					<uni-dateformat :date="Date.now()" format="MM月dd日" />
				</view>
				<view class="footer" v-if="currentInfo">

					<view class="message" @click="messageHandle">
						<uni-icons type="info" size="26"></uni-icons>
						<view class="text">
							信息
						</view>
					</view>
					<view class="score" @click="scoreHandle">
						<uni-icons type="star" size="26"></uni-icons>
						<view class="text">
							{{currentInfo.score}}
						</view>
					</view>
					<view class="download" @click="downloadHandle">
						<uni-icons type="download" size="26"></uni-icons>
						<view class="text">
							下载
						</view>
					</view>
				</view>

			</view>

			<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
				<view class="popup">
					<view class="header">
						<view class="title">
							壁纸信息
						</view>
						<view class="close" @click="closePopup">
							<uni-icons type="closeempty" size="30rpx"></uni-icons>
						</view>
					</view>
					<scroll-view scroll-y class="container" v-if="currentInfo">
						<view class="row">
							<view class="laber">
								壁纸ID:
							</view>
							<text>{{currentInfo._id}}</text>
						</view>
						<view class="row">
							<view class="laber">
								发布者:
							</view>
							<text>{{currentInfo.nickname}}</text>
						</view>
						<view class="row">
							<view class="laber">
								评分:
							</view>
							<view class="text">
								<uni-rate readonly :value="currentInfo.score"></uni-rate>
							</view>
						</view>
						<view class="row">
							<view class="laber">
								摘要:
							</view>
							<text>{{currentInfo.description}}</text>
						</view>
						<view class="row">
							<view class="laber">
								标签:
							</view>
							<view class="text" v-for="(item,index) in currentInfo.tabs" :key="item">
								<uni-tag :text="item" inverted type="success"></uni-tag>
							</view>
						</view>
						<view class="copyright">
							声明：本图片来自用户投稿，非商业使用，用于免费学习交流，如果侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱xxxxxxxx，管理员将删除侵权壁纸，维护您的权益
						</view>
					</scroll-view>
				</view>
			</uni-popup>

			<uni-popup :is-mask-click="false" ref="scorePopup" type="center">
				<view class="scorePopup">
					<view class="header">
						<view class="title">
							{{isSetupScore ? "已评分" : "壁纸评分"}}
						</view>
						<view class="close" @click="closeScorePopup">
							<uni-icons type="closeempty" size="30rpx"></uni-icons>
						</view>
					</view>
					<view class="container">
						<view class="rate">
							<uni-rate v-model="rateValue" :disabled="isSetupScore"
								disabledColor="rgb(255, 202, 62)"></uni-rate>
							<view class="rateValue">
								{{rateValue}}分
							</view>
						</view>
						<button :disabled="!rateValue || isSetupScore" size="mini" plain
							@click="getSetupScore">确认评分</button>
					</view>
				</view>
			</uni-popup>
		</div>

	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";

	import {
		onLoad
	} from "@dcloudio/uni-app"

	import {
		apiGetSetupScore,
		apiGetDownloadWall
	} from "@/api/apis.js"

	let isMask = ref(true);
	let popup = ref(null);
	const scorePopup = ref(null);
	const rateValue = ref(0);
	const classList = ref([]);
	const currentIndex = ref(0);
	const currentInfo = ref(null);
	const isSetupScore = ref(false);

	const toogleMask = () => {
		isMask.value = !isMask.value;
	}
	const messageHandle = () => {
		popup.value.open();
	}
	const scoreHandle = () => {
		scorePopup.value.open();
	}
	const closePopup = () => {
		popup.value.close();
	}
	const closeScorePopup = () => {
		scorePopup.value.close();
	}
	const goBack = () => {
		uni.navigateBack();
	}

	let storageClassList = uni.getStorageSync("storage_classList") || [];
	classList.value = storageClassList.map((item) => {
		let picurl = item.smallPicurl.replace("_small.webp", ".jpg")
		return {
			...item,
			picurl
		}
	})
	onLoad((e) => {
		console.log("priveew-id", e.id)
		currentIndex.value = classList.value.findIndex((item) => {
			return item._id == e.id
		})
		currentInfo.value = classList.value[currentIndex.value];
		if (currentInfo.value.userScore) {
			isSetupScore.value = true;
			rateValue.value = currentInfo.value.userScore;
		}
		console.log("current:", currentIndex)
		console.log("classList:", classList)
	})
	const handleSwiper = (e) => {
		console.log("handleSwiper e", e);
		currentIndex.value = e.detail.current;
		currentInfo.value = classList.value[currentIndex.value];
		rateValue.value = 0;
		isSetupScore.value = false;
		if (currentInfo.value.userScore) {
			isSetupScore.value = true;
			rateValue.value = currentInfo.value.userScore;
		}
	}
	const getSetupScore = async () => {
		uni.showLoading({
			title: "加载中..."
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value;
		let userScore = rateValue.value;
		const res = await apiGetSetupScore({
			classid,
			wallId,
			userScore
		})
		uni.hideLoading();
		classList.value[currentIndex.value].userScore = userScore;
		if (res.errCode == 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none",

			})
		}
		isSetupScore.value = true;
		closeScorePopup();
	}
	// #ifdef H5
	const downloadHandle = () => {
		uni.showModal({
			title: "提示",
			content: "请长按图片保存到本地",
			showCancel: false
		})
	}
	// #endif
	// #ifndef H5
	const downloadHandle = async() => {
		console.log("start downLoad")
		
		let {
			classid,
			_id: wallId
		} = currentInfo.value;
		await apiGetDownloadWall({classid,wallId})
		
		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (img) => {
				// console.log("1图res",res)
				uni.saveImageToPhotosAlbum({
					filePath: img.path,
					success: (res) => {
						// console.log("成功保存图片")
						uni.showToast({
							title:"图片已保存到本地",
							icon:"none"
						})
						

					},
					fail: (res) => {
						console.log("没有保存图片res",res)
						if(res.errMsg=="saveImageToPhotosAlbum:fail cancel") {
							return;
						}
						// if(res.errMsg="saveImageToPhotosAlbum:fail auth deny") {
						// 	uni.showToast({
						// 		title:"没有点击授权",
						// 		icon:"none"
						// 	})
						// 	// return;
						// }
						uni.showModal({
							title: "授权",
							content: "需要授权",
							success: (res) => {
								console.log("点击了授权res", res)
								if (res.confirm) {
									uni.openSetting({
										success: (res) => {
											console.log("open授权success",res)
											if(res["scope.writePhotosAlbum"]) {
												console.log("授权成功")
											} else {
												console.log("没有授权，点了返回")
											}
										},
										fail: (res) => {
											console.log("open授权fails，点了取消", res)
										}
									})
								}
							},
							fail: (res) => {
								console.log("每点击res", res)
							}
						})

					}
				})
			},
			fail: (img) => {
				// console.log("图1false_res",res)
			}
		})
	}
	// #endif
</script>

<style lang="scss" scoped>
	.previewLayout {
		position: relative;
		width: 100%;
		height: 100vh;

		.content {
			width: 100%;
			height: 100%;
			overflow: hidden;

			swiper {
				width: 100%;
				height: 100%;

				&-item {
					image {
						width: 100%;
						height: 100%;
						pointer-events: auto;
					}
				}
			}

			.mask {
				pointer-events: none;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 150rpx;

				.goback {
					align-self: start;
					width: 70rpx;
					height: 70rpx;
					margin-top: 50rpx;
					margin-left: 30rpx;
					border: solid 1px rgba(255, 255, 255, .5);
					background-color: rgba(0, 0, 0, .5);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					pointer-events: auto;
				}

				.pic-idx {
					color: $text-font-color-4;
					background-color: rgba(0, 0, 0, 0.4);
					// padding: 5rpx 20rpx;
					width: fit-content;
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 20rpx;
					border-radius: 60rpx;
				}

				.time {
					font-size: 110rpx;
					color: rgb(255, 255, 255);
				}

				.date {
					color: $text-font-color-4;
					margin-top: 5rpx;
				}

				.footer {
					display: flex;
					margin-top: auto;
					justify-content: space-between;
					align-items: center;
					background-color: rgba(255, 255, 255, .8);
					width: 500rpx;
					height: 120rpx;
					border-radius: 60rpx;
					padding: 0 40rpx;

					.message,
					.score,
					.download {
						padding: 0 20rpx;
						pointer-events: auto;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						gap: 10rpx;
						font-size: 26rpx;
					}

					.meesage {}

					.score {}

					.download {}
				}
			}


			.popup {
				background-color: #fff;
				border-radius: 20rpx 20rpx 0 0;
				padding: 30rpx;

				.header {
					display: flex;

					.close {
						width: 80rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 10rpx;
					}

					.title {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						color: $text-font-color-3;
					}
				}

				.container {
					max-height: 60vh;

					.row {
						display: flex;
						margin-top: 30rpx;

						.laber {
							width: 140rpx;
							text-align: right;
							color: $text-font-color-3;
						}

						text {
							flex: 1;
							padding-left: 15rpx;
						}

						.text {
							flex-direction: 1;
							padding-left: 15rpx;
						}
					}

					.copyright {
						background-color: rgba(0, 0, 0, 0.05);
						margin-top: 30rpx;
						padding: 20rpx;
					}
				}
			}

			.scorePopup {
				background-color: #fff;
				border-radius: 30rpx;
				width: 70vw;
				padding: 30rpx;

				.header {
					display: flex;

					.close {
						width: 80rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 10rpx;
					}

					.title {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						color: $text-font-color-3;
					}
				}

				.container {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 30rpx;

					.rate {
						margin-top: 30rpx;
						display: flex;
						gap: 30rpx;

						.rateValue {
							color: rgb(254, 202, 66);
						}
					}

					button {}
				}
			}
		}


	}
</style>