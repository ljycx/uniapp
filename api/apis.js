import {
	request
} from "@/utils/request.js"

export const apiGetHomeBanner = () => {
	console.log("start apiGetHomeBanner")

	return request({
		url: "/homeBanner",
		method: "GET"
	});
}

export const apiGetRandomWall = () => {
	console.log("start apiGetRandomWall")

	return request({
		url: "/randomWall",
		method: "GET"
	});
}

export const apiGetNotice = (data = {}) => {
	console.log("start apiGetNotice")

	return request({
		url: "/wallNewsList",
		method: "GET",
		data,
	});
}

export const apiGetClassify = (data = {}) => {
	console.log("start apiGetClassify")

	return request({
		url: "/classify",
		method: "GET",
		data,
	});
}

export const apiGetClassList = (data = {}) => {
	console.log("start apiGetClassList")

	return request({
		url: "/wallList",
		method: "GET",
		data,
	});
}

export const apiGetSetupScore = (data = {}) => {
	console.log("start apiGetSetupScore")

	return request({
		url: "/setupScore",
		method: "GET",
		data,
	});
	
}

export const apiGetDownloadWall = (data = {}) => {
	console.log("start apiGetDownloadWall")

	return request({
		url: "/downloadWall",
		method: "GET",
		data,
	});
	
}

export const apiGetUserInfo = (data = {}) => {
	console.log("start apiGetUserInfo")

	return request({
		url: "/userInfo",
		method: "GET",
		data,
	});
	
}

export const apiGetUserWallList = (data = {}) => {
	console.log("start apiGetUserWallList")

	return request({
		url: "/userWallList",
		method: "GET",
		data,
	});
	
}

export const apiGetNoticeDetail = (data = {}) => {
	console.log("apiGetNoticeDetail")

	return request({
		url: "/wallNewsDetail",
		method: "GET",
		data,
	});
	
}

export const apiGetSearchWall = (data = {}) => {
	console.log("apiGetSearchWall")

	return request({
		url: "/searchWall",
		method: "GET",
		data,
	});
	
}