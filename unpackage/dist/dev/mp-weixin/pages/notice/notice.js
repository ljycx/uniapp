"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  _easycom_mp_html2();
}
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  _easycom_mp_html();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    const noticeId = common_vendor.ref(null);
    const noticeDetail = common_vendor.ref(null);
    const getNoticeDetail = async () => {
      let res = await api_apis.apiGetNoticeDetail({ id: noticeId.value });
      noticeDetail.value = res.data;
    };
    common_vendor.onLoad((e) => {
      noticeId.value = e.id;
      getNoticeDetail();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: noticeDetail.value
      }, noticeDetail.value ? {
        b: common_vendor.t(noticeDetail.value.title),
        c: common_vendor.t(noticeDetail.value.author),
        d: common_vendor.t(noticeDetail.value.publish_date),
        e: common_vendor.p({
          content: noticeDetail.value.content
        }),
        f: common_vendor.t("阅读 " + noticeDetail.value.view_count)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c2e4c1e"], ["__file", "D:/HBuilderX/uni-app/wallpaper/pages/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
