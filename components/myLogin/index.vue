<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-13 15:06:24
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 16:57:26
 * @FilePath: \Blog\blog\components\myLogin\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="login">
    <view class="my-container" v-if="!userInfo.nickName">
      <image
        src="@/static/images/default-avatar.png"
        mode="scaleToFill"
        class="avatar avatar-img"
      />
      <view class="login-desc">登陆后获取同步</view>
      <button hover-class="button-hover" @click="getUserInfo" class="login-btn">
        一键登录
      </button>
    </view>

    <view class="my-container" v-else>
      <image
        :src="userInfo.avatarUrl"
        mode="scaleToFill"
        class="avatar avatar-img"
      />
      <view class="login-desc">{{ userInfo.nickName }}</view>
      <button hover-class="button-hover" @click="LogOut" class="logOut">
        退出登陆
      </button>
    </view>
  </view>
</template>

<script>
import { ref, toRefs, onBeforeMount, onMounted } from "vue";
import { getDefaultText } from "../../api/search.js";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "myLoing",
  data() {
    return {};
  },
  props: {},

  computed: {
    ...mapState("User", ["userInfo"]),
  },
  methods: {
    ...mapActions("User", ["getLoginInfo"]),
    ...mapMutations("User", ["deleteToke", "deleteUserInfo"]),
    /**
     * @description: 获取登陆信息
     * @return {*}
     */
    getUserInfo() {
      uni.getUserProfile({
        desc: "登陆后获取同步",
        lang: "zh_CN",
        success: (res) => {
          console.log("成功", res);
          // userInfo;

          this.getLoginInfo(res);
        },
        fail: (res) => {
          uni.showToast({
            title: "以取消登陆",
            duration: 2000,
            icon: "none",
          });
        },
      });
    },

    /**
     * @description: 退出登陆
     * @return {*}
     */
    LogOut() {
      uni.showModal({
        title: "提示",
        content: "您确定退出登陆？",
        success: (res) => {
          if (res.confirm) {
            // this.userInfo = null;
            this.deleteToke();
            this.deleteUserInfo();
            // this.token = null;
            uni.removeStorage({
              key: "token",
              success: function (res) {
                console.log("success");
              },
            });

            uni.removeStorage({
              key: "userInfo",
              success: function (res) {
                console.log("success");
              },
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.my-container {
  font-size: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25%;
}
.avatar {
  font-size: 16px;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
  width: 78px;
  height: 78px;
}
.login-btn {
  margin: 0;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 2.55555556;
  border-radius: 5px;

  overflow: hidden;
  cursor: pointer;
  color: #fff;
  background-color: #007aff;
  margin-top: 24px;
  width: 85%;
}
.logOut {
  margin: 0;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 2.55555556;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  color: #000;
  background-color: #f8f8f8;
  margin-top: 24px;
  width: 85%;
}
</style>
