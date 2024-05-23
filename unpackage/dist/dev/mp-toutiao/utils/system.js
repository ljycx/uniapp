"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => {
  const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
  if (SYSTEM_INFO.statusBarHeight) {
    return SYSTEM_INFO.statusBarHeight;
  } else {
    return 10;
  }
};
const getMenuHeight = () => {
  const {
    top,
    height
  } = common_vendor.index.getMenuButtonBoundingClientRect();
  const {
    statusBarHeight
  } = common_vendor.index.getSystemInfoSync();
  return (top - statusBarHeight) * 2 + height;
};
const getLeftIconLeft = () => {
  let {
    leftIcon: { left, width }
  } = tt.getCustomButtonBoundingClientRect();
  return left + parseInt(width) + 5;
};
exports.getLeftIconLeft = getLeftIconLeft;
exports.getMenuHeight = getMenuHeight;
exports.getStatusBarHeight = getStatusBarHeight;
