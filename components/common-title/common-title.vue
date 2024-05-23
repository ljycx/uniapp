<template>
	<view class="common-title">
		<view class="left">
			<slot name="name"></slot>
		</view>
		<view class="right">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.common-title {
	display: flex;
	justify-content: space-between;
	padding: 0 30rpx;
	.left {
		font-size: 40rpx;
		font-weight: 600;
	}

}
</style>