<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 15:29:29
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-09 17:25:05
 * @FilePath: \blog\components\History\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->
<!-- 组件描述:  -->
<template>
  <view class="search-history-container">
    <view class="search-history-title-box">
      <text class="search-history-title">搜索历史</text>

      <uni-icons
        v-if="!trash"
        type="trash"
        @click="clickTrash"
        class="uni-icons"
        size="16"
      ></uni-icons>
      <view v-else>
        <text class="txt" @click="DeleteAll">全部删除</text>
        <text class="txt" @click="finish">完成</text>
      </view>
    </view>

    <view class="search-history-box">
      <view
        class="search-history-item"
        v-for="(item, index) in historyData"
        :key="item"
        :style="{ 'grid-template-rows': trash ? '1fr 1fr' : '1fr' }"
      >
        <text class="history-txt" @click="SearchTrigger(item)">{{ item }}</text>
        <uni-icons
          type="clear"
          v-show="trash"
          color=""
          size="16"
          @click="deleteItem(index)"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { ref, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "my-search",
  data() {
    return {
      trash: false, // 是不是点击了垃圾桶
      historyData: [], // 历史数据
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "搜索",
    },
    isUniSearch: {
      type: Boolean,
      default: false,
    },
  },

  beforeMount() {
    uni.getStorage({
      key: "historyData",
      success: (res) => {
        if (Array.isArray(res.data)) {
          this.historyData = [...res.data];
        }
      },
    });
  },
  methods: {
    /**
     * @description: 点击垃圾桶按钮
     * @return {*}
     */
    clickTrash() {
      this.trash = true;
    },

    SearchTrigger(SearchValue) {
      this.$emit("SearchTrigger", SearchValue); //通知父组件点击了搜索
    },

    /**
     * @description:点击全部删除按钮
     * @return {*}
     */
    DeleteAll() {
      uni.showModal({
        title: "提示",
        content: "是否删除全部搜索历史记录？",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");

            uni.setStorage({
              key: "historyData",
              data: "",
              success: (res) => {
                this.historyData = [];
                this.trash = false;
              },
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    /**
     * @description:点击完成按钮
     * @return {*}
     */
    finish() {
      this.trash = false;
      uni.setStorage({
        key: "historyData",
        data: this.historyData,
        success: (res) => {},
      });
    },
    /**
     * @description:删除单个历史记录项
     * @return {*}
     */
    deleteItem(index) {
      this.historyData.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
.search-history-container {
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
  display: block;
  padding: 12px 15px;
}

.search-history-title-box {
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
  justify-content: space-between;
}
.search-history-title {
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
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: block;
  font-size: 12px;
  color: #333;
  padding: 4px 5px;
}
.uni-icons {
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
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  font-family: uniicons;
  text-decoration: none;
  text-align: center;
  color: rgb(51, 51, 51);
  font-size: 16px;
}
.search-history-box {
  font-size: 16px;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;

  // background-color: ;
  margin-top: 12px;
}
.txt {
  color: #999;
  font-size: 12px;
  padding: 4px 5px;
}
.search-history-item {
  display: grid;
  grid-template-rows: 1fr;
  place-items: center start;
  position: relative;
  padding: 8px 10px;
}

.search-history-box .search-history-item:nth-child(odd):before {
  content: " ";
  border-left: 1px solid #999;
  display: inline-block;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.history-txt {
  user-select: none;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 95%;
  display: inline-block;
  color: #333;
  font-size: 14px;
}
</style>
