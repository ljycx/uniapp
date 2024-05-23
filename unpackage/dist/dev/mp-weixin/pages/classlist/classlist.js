"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const isData = common_vendor.ref(true);
    const classQueryParams = {
      pageNum: 1,
      pageSize: 12
    };
    const getClass = async () => {
      let res;
      if (classQueryParams.classid)
        res = await api_apis.apiGetClassList(classQueryParams);
      if (classQueryParams.type)
        res = await api_apis.apiGetUserWallList(classQueryParams);
      classList.value = [...classList.value, ...res.data];
      console.log("start getClass");
      if (classQueryParams.pageSize > res.data.length) {
        isData.value = false;
        console.log("isData为false了");
      }
      common_vendor.index.setStorageSync("storage_classList", classList.value);
    };
    common_vendor.onLoad((e) => {
      if (e.id)
        classQueryParams.classid = e.id;
      if (e.type)
        classQueryParams.type = e.type;
      getClass();
    });
    common_vendor.onReachBottom(() => {
      if (!isData.value)
        return;
      classQueryParams.pageNum++;
      getClass();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length
      }, !classList.value.length ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: classList.value.length
      }, classList.value.length ? {
        e: common_vendor.p({
          status: isData.value ? "loading" : "noMore"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/uni-app/wallpaper/pages/classlist/classlist.vue"]]);
wx.createPage(MiniProgramPage);
