<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-02 15:10:51
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 20:27:02
 * @FilePath: \blog\components\HotList\index.vue
 * @Description:  搜索的项目
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->
<!-- 组件描述:  -->
<template>
  <view class="hot-list">
    <view class="search-hot-title">慕课热搜 - 全网技术 一网打尽</view>
    <view
      v-for="(item, index) in dataList"
      class="search-hot-item"
      :key="item.label"
      @click="SearchTrigger(item.label)"
    >
      <view class="ranking">
        <!-- <image class="ranking-bg" :src="getRankingBg" /> -->

        <image
          class="ranking-bg"
          src="@/static/images/ranking-1.png"
          aspectFit
          v-if="index === 0"
        ></image>

        <image
          class="ranking-bg"
          src="@/static/images/ranking-2.png"
          aspectFit
          v-else-if="index === 1"
        ></image>

        <image
          class="ranking-bg"
          src="@/static/images/ranking-3.png"
          aspectFit
          v-else-if="index === 2"
        ></image>

        <image
          class="ranking-bg"
          src="@/static/images/ranking-other.png"
          aspectFit
          v-else
        ></image>

        <text class="ranking-text" :class="{ 'text-white': index < 3 }">{{
          index
        }}</text>
      </view>

      <text class="title line-clamp">{{ item.label }}</text>

      <image
        src="@/static/tab-icons/hot-active.png"
        class="search-hot-icon"
        v-if="index <= 2"
        mode="scaleToFill"
      />
    </view>
  </view>
</template>

<script>
import { ref, toRefs, onBeforeMount, onMounted } from "vue";

import { getHotList } from "../../api/search";
export default {
  name: "hotList",
  data() {
    return {
      dataList: [],
    };
  },
  props: {},
  created() {
    getHotList().then(
      (data) => {
        this.dataList = data.data.list;
      },
      (err) => {
        console.log(err);
      }
    );
  },

  //   async beforeMount() {},
  methods: {
    SearchTrigger(SearchValue) {
      this.$emit("SearchTrigger", SearchValue); //通知父组件点击了搜索
    },
  },
};
</script>

<style scoped lang="scss">
.hot-list {
  --status-bar-height: 0px;
  --top-window-height: 0px;
  --window-left: 0px;
  --window-right: 0px;
  --window-margin: 0px;
  --window-top: calc(
    var(--top-window-height) + calc(44px + env(safe-area-inset-top))
  );
  --window-bottom: 0px;
  user-select: none;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
  display: block;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  margin: 12px;
  padding: 12px;
  box-shadow: 2px 2px 5px 1px hsla(0, 0%, 56.1%, 0.1);
}

.search-hot-title {
  --status-bar-height: 0px;
  --top-window-height: 0px;
  --window-left: 0px;
  --window-right: 0px;
  --window-margin: 0px;
  --window-top: calc(
    var(--top-window-height) + calc(44px + env(safe-area-inset-top))
  );
  --window-bottom: 0px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  display: block;
  font-weight: 700;
  font-size: 14px;
  color: #f94d2a;
  padding: 0 12px 12px 12px;
  margin: 0 -12px 12px -12px;
  box-shadow: 2px 2px 5px 1px hsla(0, 0%, 56.1%, 0.1);
}

.search-hot-item {
  --status-bar-height: 0px;
  --top-window-height: 0px;
  --window-left: 0px;
  --window-right: 0px;
  --window-margin: 0px;
  --window-top: calc(
    var(--top-window-height) + calc(44px + env(safe-area-inset-top))
  );
  --window-bottom: 0px;
  user-select: none;
  font-size: 16px;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  padding: 12px 0;
}
.search-hot-icon {
  --status-bar-height: 0px;
  --top-window-height: 0px;
  --window-left: 0px;
  --window-right: 0px;
  --window-margin: 0px;
  --window-top: calc(
    var(--top-window-height) + calc(44px + env(safe-area-inset-top))
  );
  --window-bottom: 0px;
  user-select: none;
  font-size: 16px;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 14px;
  height: 14px;
}

.title {
  --status-bar-height: 0px;
  --top-window-height: 0px;
  --window-left: 0px;
  --window-right: 0px;
  --window-margin: 0px;
  --window-top: calc(
    var(--top-window-height) + calc(44px + env(safe-area-inset-top))
  );
  --window-bottom: 0px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  color: #333;
  font-size: 14px;
  margin: 0 10px;
}
.ranking {
  position: relative;
  text-align: center;
  width: 18px;
  height: 20px;
  .ranking-bg {
    width: 100%;
    height: 100%;
  }
  .ranking-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -55%);
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
  .text-white {
    color: white;
  }
}
</style>
