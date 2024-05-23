"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_tag2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_tag + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    let isMask = common_vendor.ref(true);
    let popup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const rateValue = common_vendor.ref(0);
    const classList = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    const currentInfo = common_vendor.ref(null);
    const isSetupScore = common_vendor.ref(false);
    const toogleMask = () => {
      isMask.value = !isMask.value;
    };
    const messageHandle = () => {
      popup.value.open();
    };
    const scoreHandle = () => {
      scorePopup.value.open();
    };
    const closePopup = () => {
      popup.value.close();
    };
    const closeScorePopup = () => {
      scorePopup.value.close();
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    let storageClassList = common_vendor.index.getStorageSync("storage_classList") || [];
    classList.value = storageClassList.map((item) => {
      let picurl = item.smallPicurl.replace("_small.webp", ".jpg");
      return {
        ...item,
        picurl
      };
    });
    common_vendor.onLoad((e) => {
      console.log("priveew-id", e.id);
      currentIndex.value = classList.value.findIndex((item) => {
        return item._id == e.id;
      });
      currentInfo.value = classList.value[currentIndex.value];
      if (currentInfo.value.userScore) {
        isSetupScore.value = true;
        rateValue.value = currentInfo.value.userScore;
      }
      console.log("current:", currentIndex);
      console.log("classList:", classList);
    });
    const handleSwiper = (e) => {
      console.log("handleSwiper e", e);
      currentIndex.value = e.detail.current;
      currentInfo.value = classList.value[currentIndex.value];
      rateValue.value = 0;
      isSetupScore.value = false;
      if (currentInfo.value.userScore) {
        isSetupScore.value = true;
        rateValue.value = currentInfo.value.userScore;
      }
    };
    const getSetupScore = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let userScore = rateValue.value;
      const res = await api_apis.apiGetSetupScore({
        classid,
        wallId,
        userScore
      });
      common_vendor.index.hideLoading();
      classList.value[currentIndex.value].userScore = userScore;
      if (res.errCode == 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "none"
        });
      }
      isSetupScore.value = true;
      closeScorePopup();
    };
    const downloadHandle = async () => {
      console.log("start downLoad");
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      await api_apis.apiGetDownloadWall({ classid, wallId });
      common_vendor.index.getImageInfo({
        src: currentInfo.value.picurl,
        success: (img) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: img.path,
            success: (res) => {
              common_vendor.index.showToast({
                title: "图片已保存到本地",
                icon: "none"
              });
            },
            fail: (res) => {
              console.log("没有保存图片res", res);
              if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                return;
              }
              common_vendor.index.showModal({
                title: "授权",
                content: "需要授权",
                success: (res2) => {
                  console.log("点击了授权res", res2);
                  if (res2.confirm) {
                    common_vendor.index.openSetting({
                      success: (res3) => {
                        console.log("open授权success", res3);
                        if (res3["scope.writePhotosAlbum"]) {
                          console.log("授权成功");
                        } else {
                          console.log("没有授权，点了返回");
                        }
                      },
                      fail: (res3) => {
                        console.log("open授权fails，点了取消", res3);
                      }
                    });
                  }
                },
                fail: (res2) => {
                  console.log("每点击res", res2);
                }
              });
            }
          });
        },
        fail: (img) => {
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? {
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: Math.abs(currentIndex.value - index) < 2
          }, Math.abs(currentIndex.value - index) < 2 ? {
            b: item.picurl,
            c: common_vendor.o(toogleMask)
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(handleSwiper)
      } : {}, {
        e: common_vendor.p({
          type: "left",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.o(goBack),
        g: common_vendor.t(currentIndex.value + 1 + "/" + classList.value.length),
        h: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        i: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        j: currentInfo.value
      }, currentInfo.value ? {
        k: common_vendor.p({
          type: "info",
          size: "26"
        }),
        l: common_vendor.o(messageHandle),
        m: common_vendor.p({
          type: "star",
          size: "26"
        }),
        n: common_vendor.t(currentInfo.value.score),
        o: common_vendor.o(scoreHandle),
        p: common_vendor.p({
          type: "download",
          size: "26"
        }),
        q: common_vendor.o(downloadHandle)
      } : {}, {
        r: common_vendor.unref(isMask),
        s: common_vendor.p({
          type: "closeempty",
          size: "30rpx"
        }),
        t: common_vendor.o(closePopup),
        v: currentInfo.value
      }, currentInfo.value ? {
        w: common_vendor.t(currentInfo.value._id),
        x: common_vendor.t(currentInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          value: currentInfo.value.score
        }),
        z: common_vendor.t(currentInfo.value.description),
        A: common_vendor.f(currentInfo.value.tabs, (item, index, i0) => {
          return {
            a: "2dad6c07-9-" + i0 + ",2dad6c07-6",
            b: common_vendor.p({
              text: item,
              inverted: true,
              type: "success"
            }),
            c: item
          };
        })
      } : {}, {
        B: common_vendor.sr(popup, "2dad6c07-6", {
          "k": "popup"
        }),
        C: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0"
        }),
        D: common_vendor.t(isSetupScore.value ? "已评分" : "壁纸评分"),
        E: common_vendor.p({
          type: "closeempty",
          size: "30rpx"
        }),
        F: common_vendor.o(closeScorePopup),
        G: common_vendor.o(($event) => rateValue.value = $event),
        H: common_vendor.p({
          disabled: isSetupScore.value,
          disabledColor: "rgb(255, 202, 62)",
          modelValue: rateValue.value
        }),
        I: common_vendor.t(rateValue.value),
        J: !rateValue.value || isSetupScore.value,
        K: common_vendor.o(getSetupScore),
        L: common_vendor.sr(scorePopup, "2dad6c07-10", {
          "k": "scorePopup"
        }),
        M: common_vendor.p({
          ["is-mask-click"]: false,
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "D:/HBuilderX/uni-app/wallpaper/pages/preview/preview.vue"]]);
tt.createPage(MiniProgramPage);
