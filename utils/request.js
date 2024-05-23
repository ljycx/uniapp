const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
const ACCESS_KEY = "xiana233";

export const request = (config = {}) => {
	let {
		url,
		method,
		header = {},
		data = {},
	} = config
	url = BASE_URL + url;
	header["access-key"] = ACCESS_KEY;
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			header,
			success(res) {
				// 如果请求成功||失败
				if (res.data.errCode === 0) {
					resolve(res.data);
				} else if (res.data.errCode === 400) {
					uni.showModal({
						title: "请求失败",
						content: res.data.errMsg,
						showCancel:false
					})
					reject(res.data.errMsg);
				} else {
					uni.showModal({
						title: "请求失败",
						content: res.data.errMsg,
						showCancel:false
					})
					reject(res.data.errMsg);
				}
			},
			fail(res) {
				reject(res)
			}
		})

	})
}