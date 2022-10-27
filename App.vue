<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 14:54:51
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 09:58:14
 * @FilePath: \blog\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
export default {
  onLaunch: function () {
    console.warn(
      "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！"
    );

    console.log("App Launch");

    console.log(uni.getSystemInfoSync().platform, "获取系统信息的平台状态");

    /* #ifndef MP-WEIXIN */

    /* #endif */
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */

@import "@/uni_modules/uni-scss/index.scss";
/* #ifndef APP-NVUE */
@import "@/static/customicons.css";

//@import "@/uni_modules/uni-scss/variables.scss";

// 去掉h5的scroll-view的滑动条
@import "@/base.scss";

// 设置整个项目的背景色
page {
  background-color: #f5f5f5;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
</style>
