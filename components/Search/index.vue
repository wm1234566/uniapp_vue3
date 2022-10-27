<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 15:29:29
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-12 21:55:33
 * @FilePath: \blog\components\Search\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->
<!-- 组件描述:  -->
<template>
  <view class="search">
    <uni-search-bar
      v-if="isUniSearch"
      :placeholder="placeholder"
      v-model="SearchText"
      radius="100"
      bgColor="#F1F0F3"
      clearButton="auto"
      @confirm="Search"
      @cancel="Cancel"
      @input="Input"
      @clear="Clear"
      @focus="Focus"
      @blur="Blur"
      cancel-text="取消"
    >
      <uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
    </uni-search-bar>

    <view class="Search" v-else>
      <image class="search-icon" :src="Icon" mode="aspectFit" />

      <text class="text">{{ Showtext === "" ? placeholder : Showtext }}</text>
    </view>
  </view>
</template>

<script>
import { ref, toRefs, onBeforeMount, onMounted } from "vue";
import { getDefaultText } from "../../api/search.js";
import search from "../../static/images/search.png";

export default {
  name: "my-search",
  data() {
    return {
      // SearchText: "",
      placeholder: "",
    };
  },
  props: {
    // placeholder: {
    //   type: String,
    //   default: "搜索",
    // },

    SearchText: {
      type: String,
      default: "",
    },
    isUniSearch: {
      type: Boolean,
      default: false,
    },
    Icon: {
      type: String,
      // type: Object,
      default: search,
    },
    Showtext: {
      type: String,
      default: "",
    },
  },

  watch: {
    SearchText: {
      handler(newValue, old) {
        //  console.log("sdfsdfsd西乡");
        this.defaultText = newValue;
      },
    },
  },
  beforeMount() {
    getDefaultText().then(
      (data) => {
        // console.log("数据", data.data.defaultText);
        this.placeholder = data.data.defaultText;
      },
      (err) => console.log(err)
    );
  },
  methods: {
    Search(e) {
      //console.log("输入的数据是", e.value);

      let SearchValue = "默认值";
      if (!e.value) {
        SearchValue = this.placeholder;
      } else {
        SearchValue = e.value;
      }

      this.$emit("SearchTrigger", SearchValue); //通知父组件点击了搜索
    },

    Cancel(e) {
      // console.log("Cancel", e);
      this.$emit("clickCancel", true);
    },
    Input() {},
    Clear() {},
    Focus(e) {
      this.$emit("focusState", true);
      console.log("获取焦点，要切换为输入模式");
    },
    Blur() {},
  },
};
</script>

<style scoped lang="scss">
.Search {
  height: 45rpx;
  border: 2rpx solid $uni-border-4;
  width: 700rpx;
  margin: 0 auto;
  padding: 13rpx;
  border-radius: 37rpx;

  .search-icon {
    height: 45rpx;
    float: left;
    width: 45rpx;
    margin: 0 11rpx;
    // vertical-align: middle;
  }

  .text {
    font-size: 30rpx;
    // vertical-align: middle;
    line-height: 45rpx;
  }
}
</style>
