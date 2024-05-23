"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_tag2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_tag + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    let storageHistoryList = common_vendor.index.getStorageSync("storageHistoryList") || [];
    const historyList = common_vendor.ref(storageHistoryList);
    const hotList = common_vendor.ref(["美女", "ai"]);
    const picList = common_vendor.ref([]);
    const isData = common_vendor.ref(true);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
    });
    const search = (res) => {
      let item = /* @__PURE__ */ new Set([res.value, ...historyList.value]);
      historyList.value = [...item];
      common_vendor.index.setStorageSync("storageHistoryList", historyList.value);
      getSearchWall();
    };
    const handleTag = (keyword) => {
      queryParams.value.keyword = keyword;
      search({ value: keyword });
    };
    const input = (res) => {
      console.log("----input:", res);
    };
    const clear = (res) => {
      common_vendor.index.showToast({
        title: "clear事件，清除值为：" + res.value,
        icon: "none"
      });
    };
    const blur = (res) => {
    };
    const focus = (e) => {
    };
    const initData = () => {
      queryParams.value.keyword = "";
      queryParams.value.pageNum = 1;
      picList.value = [];
    };
    const cancel = (res) => {
      initData();
    };
    const clearHistoryList = () => {
      common_vendor.index.showModal({
        title: "请选择",
        content: "确认清除吗"
      }).then((sus) => {
        if (sus.confirm) {
          historyList.value = [];
        }
      });
    };
    const getSearchWall = async () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let res = await api_apis.apiGetSearchWall(queryParams.value);
      picList.value = [...picList.value, ...res.data];
      console.log("比较", queryParams.value.pageSize, res.data.length);
      if (queryParams.value.pageSize > res.data.length)
        isData.value = false;
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("storage_classList", picList.value);
    };
    const goPagePreview = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id
      });
    };
    common_vendor.onReachBottom(() => {
      if (!isData.value)
        return;
      queryParams.value.pageNum++;
      getSearchWall();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.o(blur),
        c: common_vendor.o(focus),
        d: common_vendor.o(input),
        e: common_vendor.o(cancel),
        f: common_vendor.o(clear),
        g: common_vendor.o(($event) => queryParams.value.keyword = $event),
        h: common_vendor.p({
          focus: true,
          modelValue: queryParams.value.keyword
        }),
        i: historyList.value.length && !picList.value.length
      }, historyList.value.length && !picList.value.length ? {
        j: common_vendor.p({
          type: "trash-filled",
          size: "24",
          color: "rgb(115, 115, 115)"
        }),
        k: common_vendor.o(clearHistoryList),
        l: common_vendor.f(historyList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleTag(item)),
            b: "c10c040c-2-" + i0,
            c: common_vendor.p({
              text: item
            })
          };
        })
      } : {}, {
        m: !picList.value.length
      }, !picList.value.length ? {
        n: common_vendor.f(hotList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => handleTag(item)),
            b: "c10c040c-3-" + i0,
            c: common_vendor.p({
              text: item
            })
          };
        })
      } : {}, {
        o: common_vendor.f(picList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPagePreview(item._id))
          };
        }),
        p: !isData.value && picList.value.length
      }, !isData.value && picList.value.length ? {
        q: common_vendor.p({
          status: "noMore"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/HBuilderX/uni-app/wallpaper/pages/search/search.vue"]]);
tt.createPage(MiniProgramPage);
