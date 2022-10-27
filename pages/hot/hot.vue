<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 15:23:44
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 09:14:02
 * @FilePath: \blog\pages\hot\hot.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->
<template>
  <view class="hot-container">
    <!-- log图片 -->
    <image class="log" src="@/static/images/logo.png" mode="aspectFit" />

    <!-- 搜索 -->

    <view @click="skip">
      <mySearch :placeholder="SearchText"></mySearch>
    </view>
    <!-- <u-sticky offset-top="200"> sdfsdfsdfsdfsd</u-sticky> -->
    <!-- <view class="tab-sticky"> -->
    <Tabs
      :tabsData="tabsdata"
      :defaultIndex="currentID"
      @tabClick="getCurrentID"
    ></Tabs>
    <!-- </view> -->

    <!-- 下面的 -->
    <SwiperList
      ref="List"
      :currentID="currentID"
      @itemchange="ItemChange"
      :total="total"
    >
    </SwiperList>

    <uni-load-more
      iconType="auto"
      status="no-more"
      :contentText="contentText"
      v-if="ReachBottom"
    />
  </view>
</template>

<script>
import mySearch from "../../components/Search/index.vue";
import Tabs from "../../components/Tabs/index.vue";
import SwiperList from "../../components/SwiperList/index.vue";
import { getTabs } from "../../api/hot.js";

export default {
  data() {
    return {
      SearchText: "搜索",
      tabsdata: [], //横条数据
      currentID: 0, // 当前选中项
      total: 2, // 页数
      //   List: null,
      scrollTop: 0,
      ReachBottom: false, //是否到底部了

      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了",
      },
    };
  },
  components: {
    mySearch,
    Tabs,
    SwiperList,
  },
  created() {
    getTabs().then(
      (data) => {
        this.tabsdata = data.data.list;
        this.total = data.data.list.length;
      },
      (err) => {
        console.log(err);
      }
    );
  },
  watch: {
    currentID: {
      /**
       * @description: 当发生页面切换的时候，就判断上一个一个页面是不是超过200，如果是就设置为170，多出的是顶部的高度
       * @return {*}
       */
      handler() {
        if (this.scrollTop > 150) {
          uni.pageScrollTo({
            duration: 500, // 毫秒
            scrollTop: 140, // 位置
          });
        }
      },
    },
  },
  methods: {
    getCurrentID(index) {
      this.currentID = index;
    },
    ItemChange(value) {
      this.currentID = value;
    },
    /**
     * @description: 路径跳转
     * @return {*}
     */
    skip() {
      // console.log("触发");
      uni.navigateTo({
        url: "/subpkg/search-blog/search-blog",
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
  },
  /**
   * @description: 监听下拉操作
   * @return {*}
   */
  onPullDownRefresh() {
    //只能在页的组件能用
    //页面的方法
    //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次

    // console.log("sdfsdf", this.$refs.List);

    this.$refs.List.updateListData(this.currentID, 1); //更新当页数据

    setTimeout(function () {
      uni.stopPullDownRefresh(); //停止下拉刷新动画
    }, 1000);
  },

  /**
   * @description: 监听页面滑动距离
   * @param {*} scrollTop
   * @return {*}
   */
  onPageScroll({ scrollTop }) {
    // console.log("xx", scrollTop);
    this.scrollTop = scrollTop;
  },

  /**
   * @description: 当滑到底部的时候的展示
   * @return {*}
   */
  onReachBottom() {
    // console.log("到底了");
    this.ReachBottom = true;
  },
  onLoad(options) {
    console.log("进入当前页", options);
  },
  onShow(...value) {
    console.log("页面展示", value);
  },
};
</script>

<style lang="scss">
// .tab-sticky {
// }

.hot-container {
  background-color: #fff;
  width: 100%;
  .log {
    height: 160rpx;
    width: 100%;
    margin: 10rpx 0;
  }
}
</style>
