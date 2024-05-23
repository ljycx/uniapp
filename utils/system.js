// 获取设备信息
const SYSTEM_INFO = uni.getSystemInfoSync();

// 获取状态栏的高度
export const getStatusBarHeight = () => {
	const SYSTEM_INFO = uni.getSystemInfoSync();
	if (SYSTEM_INFO.statusBarHeight) {
		return SYSTEM_INFO.statusBarHeight;
	} else {
		return 10;
	}
}


// 计算得到小程序菜单按钮高度
export const getMenuHeight = () => {
	// #ifdef MP
	// 获取小程序菜单按钮布局位置信息
	const {
		top,
		height
	} = uni.getMenuButtonBoundingClientRect();
	const {
		statusBarHeight
	} = uni.getSystemInfoSync();
	return (top - statusBarHeight) * 2 + height;
	// #endif

	// #ifndef MP
	return 60;
	// #endif

}

export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let {
		leftIcon: {left,width}
	} = tt.getCustomButtonBoundingClientRect();
	// console.log("douyin:",tt.getCustomButtonBoundingClientRect())
	return left + parseInt(width) + 5;
	// #endif

	// #ifndef MP-TOUTIAO
	return 0;
	// #endif
}