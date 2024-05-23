"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "custom-top-bar",
  props: {
    title: {
      type: String,
      default: "壁纸"
    }
  },
  setup(__props) {
    let statusBarHeight = common_vendor.ref(utils_system.getStatusBarHeight());
    let menuHeight = common_vendor.ref(utils_system.getMenuHeight());
    let tikTokIconLeft = common_vendor.ref(utils_system.getLeftIconLeft());
    const props = __props;
    const goPageSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(statusBarHeight) + "px",
        b: common_vendor.t(props.title),
        c: common_vendor.unref(tikTokIconLeft) + "px",
        d: common_vendor.p({
          type: "search",
          size: "20"
        }),
        e: common_vendor.o(goPageSearch),
        f: common_vendor.unref(menuHeight) + "px",
        g: common_vendor.unref(statusBarHeight) + common_vendor.unref(menuHeight) + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f5eea02"], ["__file", "D:/HBuilderX/uni-app/wallpaper/components/custom-top-bar/custom-top-bar.vue"]]);
tt.createComponent(Component);
