<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-01 21:48:55
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-10 17:08:40
 * @FilePath: \blog\subpkg\search-blog\search-blog.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->

<template>
  <view class="search-blog">
    <mySearch
      :isUniSearch="true"
      @focusState="focusState"
      @clickCancel="clickCancel"
      @SearchTrigger="searching"
      :SearchText="SearchText"
    ></mySearch>
    <!-- 如果没有获得焦点 显示hotList  -->
    <HotList v-show="hotShow" @SearchTrigger="searching"> </HotList>
    <!-- 如何获得焦点展示 History焦点 -->
    <History v-if="histShow" @SearchTrigger="searching"></History>
    <ArticleShows
      v-if="searchShow"
      :SearchText="SearchText"
      :ReachBottom="ReachBottom"
    ></ArticleShows>
  </view>
</template>

<script>
import mySearch from "../../components/Search/index.vue";
import HotList from "../../components/HotList/index.vue";
import History from "../../components/History/index.vue";
import ArticleShows from "../../components/ArticleShows/index.vue";
import { getDefaultText } from "../../api/search.js";
export default {
  data() {
    return {
      hotShow: true, // 展示热度帮
      histShow: false, // 展示历史榜单
      SearchText: "", // 网络请求的输入内容
      searchShow: false, // 是否展示搜索页面
      //SearchData: "",
      ReachBottom: 1,
    };
  },
  components: {
    mySearch,
    HotList,
    History,
    ArticleShows,
  },
  // beforeMount() {
  //   getDefaultText().then(
  //     (data) => {
  //       console.log("数据", data.data.defaultText);
  //       this.placeholder = data.data.defaultText;
  //     },

  //     (err) => console.log(err)
  //   );
  // },
  onReachBottom(...ags) {
    console.log("下拉触底", ...ags);
    this.ReachBottom++;
  },
  methods: {
    /**
     * @description:获得焦点的时候
     * @param {*} status
     * @return {*}
     */
    focusState(status) {
      console.log("执行函数");
      this.histShow = true;
      this.hotShow = false;
      this.searchShow = false;
    },
    /**
     * @description:点击取消的时候
     * @return {*}
     */
    clickCancel() {
      this.histShow = false;
      this.hotShow = true;
      this.searchShow = false;
    },
    searching(SearchValue) {
      // console.log("输入的值", value);

      //点击输入
      let historyData = [];

      uni.getStorage({
        key: "historyData",
        success: function (res) {
          //  console.log("结果", res.data, Array.isArray(res.data));

          if (Array.isArray(res.data)) {
            historyData = [...res.data];

            let index = historyData.findIndex(
              (item, index) => item === SearchValue
            );
            if (index !== -1) {
              historyData.splice(index, 1);
            }

            historyData.unshift(SearchValue);
          }

          uni.setStorage({
            key: "historyData",
            data: historyData,
            success: function () {
              console.log("success");
            },
          });
        },
        fail: function (err) {
          historyData.push(SearchValue);
          console.log("cu", historyData);
          uni.setStorage({
            key: "historyData",
            data: historyData,
            success: function () {
              console.log("success");
            },
          });
        },
      });

      this.histShow = false;
      this.hotShow = false;
      this.searchShow = true;
      this.SearchText = SearchValue;
    },
  },
};
</script>

<style lang="scss"></style>
