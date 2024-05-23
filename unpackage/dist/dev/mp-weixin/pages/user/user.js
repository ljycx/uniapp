"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userInfo = common_vendor.ref(null);
    const getUserInfo = async () => {
      let res = await api_apis.apiGetUserInfo();
      userInfo.value = res.data;
      console.log("userinfo", userInfo);
    };
    const goPageSubscribe = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/notice?id=65361e318b0da4ca084e3ce0"
      });
    };
    const goPageQuestion = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/notice?id=6536358ce0ec19c8d67fbe82"
      });
    };
    getUserInfo();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value
      }, userInfo.value ? {
        b: common_assets._imports_0,
        c: common_vendor.t(userInfo.value.IP),
        d: common_vendor.t(userInfo.value.address.city || userInfo.value.address.province || userInfo.value.address.country),
        e: common_vendor.p({
          type: "download-filled",
          size: "24"
        }),
        f: common_vendor.t(userInfo.value.downloadSize),
        g: common_vendor.p({
          type: "right",
          size: "20"
        }),
        h: common_vendor.p({
          type: "star-filled",
          size: "24"
        }),
        i: common_vendor.t(userInfo.value.scoreSize),
        j: common_vendor.p({
          type: "right",
          size: "20"
        }),
        k: common_vendor.p({
          type: "download-filled",
          size: "24"
        }),
        l: common_vendor.p({
          type: "right",
          size: "20"
        }),
        m: common_vendor.p({
          type: "notification-filled",
          size: "30"
        }),
        n: common_vendor.p({
          type: "right",
          size: "20"
        }),
        o: common_vendor.p({
          type: "help-filled",
          size: "30"
        }),
        p: common_vendor.p({
          type: "right",
          size: "20"
        }),
        q: common_vendor.o(goPageQuestion),
        r: common_vendor.o(goPageSubscribe)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/HBuilderX/uni-app/wallpaper/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
