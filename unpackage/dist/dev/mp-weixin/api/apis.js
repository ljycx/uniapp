"use strict";
const utils_request = require("../utils/request.js");
const apiGetHomeBanner = () => {
  console.log("start apiGetHomeBanner");
  return utils_request.request({
    url: "/homeBanner",
    method: "GET"
  });
};
const apiGetRandomWall = () => {
  console.log("start apiGetRandomWall");
  return utils_request.request({
    url: "/randomWall",
    method: "GET"
  });
};
const apiGetNotice = (data = {}) => {
  console.log("start apiGetNotice");
  return utils_request.request({
    url: "/wallNewsList",
    method: "GET",
    data
  });
};
const apiGetClassify = (data = {}) => {
  console.log("start apiGetClassify");
  return utils_request.request({
    url: "/classify",
    method: "GET",
    data
  });
};
const apiGetClassList = (data = {}) => {
  console.log("start apiGetClassList");
  return utils_request.request({
    url: "/wallList",
    method: "GET",
    data
  });
};
const apiGetSetupScore = (data = {}) => {
  console.log("start apiGetSetupScore");
  return utils_request.request({
    url: "/setupScore",
    method: "GET",
    data
  });
};
const apiGetDownloadWall = (data = {}) => {
  console.log("start apiGetDownloadWall");
  return utils_request.request({
    url: "/downloadWall",
    method: "GET",
    data
  });
};
const apiGetUserInfo = (data = {}) => {
  console.log("start apiGetUserInfo");
  return utils_request.request({
    url: "/userInfo",
    method: "GET",
    data
  });
};
const apiGetUserWallList = (data = {}) => {
  console.log("start apiGetUserWallList");
  return utils_request.request({
    url: "/userWallList",
    method: "GET",
    data
  });
};
const apiGetNoticeDetail = (data = {}) => {
  console.log("apiGetNoticeDetail");
  return utils_request.request({
    url: "/wallNewsDetail",
    method: "GET",
    data
  });
};
const apiGetSearchWall = (data = {}) => {
  console.log("apiGetSearchWall");
  return utils_request.request({
    url: "/searchWall",
    method: "GET",
    data
  });
};
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetDownloadWall = apiGetDownloadWall;
exports.apiGetHomeBanner = apiGetHomeBanner;
exports.apiGetNotice = apiGetNotice;
exports.apiGetNoticeDetail = apiGetNoticeDetail;
exports.apiGetRandomWall = apiGetRandomWall;
exports.apiGetSearchWall = apiGetSearchWall;
exports.apiGetSetupScore = apiGetSetupScore;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiGetUserWallList = apiGetUserWallList;
