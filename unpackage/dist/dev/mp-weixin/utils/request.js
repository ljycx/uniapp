"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
const ACCESS_KEY = "xiana233";
const request = (config = {}) => {
  let {
    url,
    method,
    header = {},
    data = {}
  } = config;
  url = BASE_URL + url;
  header["access-key"] = ACCESS_KEY;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      header,
      success(res) {
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "请求失败",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data.errMsg);
        } else {
          common_vendor.index.showModal({
            title: "请求失败",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data.errMsg);
        }
      },
      fail(res) {
        reject(res);
      }
    });
  });
};
exports.request = request;
