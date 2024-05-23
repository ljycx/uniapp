"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_top_bar2 = common_vendor.resolveComponent("custom-top-bar");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_top_bar2 + _easycom_theme_item2)();
}
const _easycom_custom_top_bar = () => "../../components/custom-top-bar/custom-top-bar.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_top_bar + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    const queryParams = {
      pageNum: 1,
      pageSize: 50
    };
    const getClassify = async () => {
      const res = await api_apis.apiGetClassify(queryParams);
      classifyList.value = res.data;
    };
    getClassify();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "分类"
        }),
        b: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "b8b0a412-1-" + i0,
            c: common_vendor.p({
              classifyItem: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/uni-app/wallpaper/pages/classify/classify.vue"]]);
tt.createPage(MiniProgramPage);
