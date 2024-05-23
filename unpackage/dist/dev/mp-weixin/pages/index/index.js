"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_top_bar2 = common_vendor.resolveComponent("custom-top-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_top_bar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_top_bar = () => "../../components/custom-top-bar/custom-top-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_top_bar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const homeBannerList = common_vendor.ref([]);
    const randomWallList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const classifyList = common_vendor.ref([]);
    const getHomeBanner = async () => {
      const res = await api_apis.apiGetHomeBanner();
      homeBannerList.value = res.data;
    };
    const getRandomWall = async () => {
      const res = await api_apis.apiGetRandomWall();
      randomWallList.value = res.data;
    };
    const getNotice = async () => {
      const res = await api_apis.apiGetNotice({
        select: true
      });
      noticeList.value = res.data;
    };
    const getClassify = async () => {
      const res = await api_apis.apiGetClassify({
        select: true
      });
      classifyList.value = res.data;
    };
    const goPageNotice = (id) => {
      console.log("go pageNotice e", id);
      common_vendor.index.navigateTo({
        url: "/pages/notice/notice?id=" + id
      });
    };
    const previewImg = (index) => {
      let imgUrls = randomWallList.value.map((item) => {
        return item.smallPicurl;
      });
      common_vendor.index.previewImage({
        urls: imgUrls,
        current: index
      });
    };
    getHomeBanner();
    getRandomWall();
    getNotice();
    getClassify();
    common_vendor.onShareAppMessage(() => {
      return {
        title: "夏娜壁纸",
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(homeBannerList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        c: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        d: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id,
            c: common_vendor.o(($event) => goPageNotice(item._id), item._id)
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "20"
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "24",
          color: "rgb(40, 180, 141)"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        h: common_vendor.f(randomWallList.value, (item, index, i0) => {
          return {
            a: item.smallPicurl,
            b: common_vendor.o(($event) => previewImg(index), item._id),
            c: item._id
          };
        }),
        i: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              classifyItem: item
            })
          };
        }),
        j: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/HBuilderX/uni-app/wallpaper/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
