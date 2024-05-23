"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "theme-item",
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    classifyItem: {
      type: Object,
      default() {
        return {
          name: "动漫少女",
          picurl: "https://raw.githubusercontent.com/oOzhuoxiaOo/PicGo/main/test/Project-01.jpg",
          updateTime: Date.now(),
          id: "6524a48f6523417a8a8b825d"
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    console.log("props:", props);
    const timeTitle = common_vendor.ref(utils_common.getTimeAgo(props.classifyItem.updateTime));
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !props.isMore
      }, !props.isMore ? {
        b: props.classifyItem.picurl,
        c: common_vendor.t(timeTitle.value),
        d: common_vendor.t(props.classifyItem.name),
        e: "/pages/classlist/classlist?id=" + props.classifyItem._id
      } : {}, {
        f: props.isMore
      }, props.isMore ? {
        g: common_assets._imports_0,
        h: common_vendor.p({
          type: "more-filled",
          size: "30",
          color: "rgb(255,255,255)"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/uni-app/wallpaper/components/theme-item/theme-item.vue"]]);
wx.createComponent(Component);
