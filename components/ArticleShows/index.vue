<template>
  <view class="articleShow">
    <view
      class="search-result-item-box"
      v-for="(item, index) in SearchData"
      :key="item.id"
      @click="detailArticle(item)"
    >
      <rich-text :nodes="item.title" class="item-title"></rich-text>

      <view
        class="item-info-img-box"
        v-if="item.pic_list?.length === 3 || item.pic_list?.length === 2"
      >
        <image
          v-for="(item1, index1) in item.pic_list"
          :src="item1"
          mode="scaleToFill"
          class="item-img"
          :key="item1"
        />
      </view>

      <rich-text
        :nodes="item.description"
        v-else-if="!item.pic_list || item.pic_list?.length === 0"
        class="item-desc"
      ></rich-text>

      <view class="item-info-box" v-else-if="item.pic_list?.length === 1">
        <view class="item-desc-box">
          <rich-text :nodes="item.description" class="item-desc"></rich-text>
        </view>
        <image
          class="item-img"
          v-for="(item1, index1) in item.pic_list"
          :src="item1"
          mode="scaleToFill"
          :key="item1"
        />
      </view>

      <view class="item-desc-bottom">
        <rich-text :nodes="item.nickname" class="item-author"></rich-text>
        <view class="item-read-num">
          <uni-icons type="compose " size="16"></uni-icons>
          <text>{{ item.create_time_str }}</text>
        </view>
      </view>
    </view>

    <uni-load-more
      iconType="auto"
      status="no-more"
      :contentText="contentText"
      v-if="isReachBottom"
    />
  </view>
</template>

<script>
import { Search } from "../../api/search.js";
export default {
  data() {
    return {
      SearchData: [], // 渲染的数据
      pageindex: 1, //请求的当前页面
      isReachBottom: false, //是不是所有数据都加载完了
      contentText: "没有更多数据了！",
    };
  },
  props: {
    SearchText: {
      type: String,
      default: "搜索",
    },
    //是否下拉到底部了
    ReachBottom: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    detailArticle(item) {
      // console.log("输出的数据", item);
      uni.navigateTo({
        url: `/subpkg/articles/articles?author=${item.author}&articleId=${item.id}`,
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
  },

  watch: {
    SearchText: {
      handler(newValue, old) {
        console.log("执行了吗", newValue);
        Search(newValue, 1).then(
          (data) => {
            console.log("data", data);
            this.SearchData = data.data.list;
          },
          (err) => {}
        );
      },

      deep: true,
      immediate: true,
    },
    ReachBottom: {
      handler(newValue) {
        if (!this.isReachBottom) {
          //没到最底部可以继续请求
          Search(this.SearchText, this.pageindex + 1).then(
            (data) => {
              if (data.data.list.length >= 1) {
                this.SearchData.push(...data.data.list);
                this.pageindex++;
              } else {
                this.isReachBottom = true; //到了最底部
              }
              //console.log("data", this.SearchData, "=====>", data.data.list);
            },

            (err) => {}
          );
        }
      },
    },
  },
  // watch: {
  //   currentID: {
  //     handler(newValue) {
  //       this.LocationID = newValue; //
  //     },

  //     immediate: true,
  //   },
  // },
};
</script>

<style scoped lang="scss">
.articleShow {
  font-size: 16px;
  margin: 0;
  display: block;
  padding: 12px 15px;
}

.search-result-item-box {
  font-size: 16px;
  margin: 0;
  display: block;
  margin-bottom: 24px;
}
.item-title {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  & :nth-child(1) {
    & :nth-child(1) {
      font-size: 14px;
      font-weight: 700;
      font-style: italic;
      color: #f94d2a;
      margin: 0 2px;
    }
  }
}

.item-info-img-box {
  font-size: 16px;
  margin: 0;
  display: flex;
}
.item-img {
  font-size: 16px;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 33%;
  height: 70px;
  box-sizing: border-box;
  margin-right: 5px;
}
.item-desc-bottom {
  user-select: none;
  margin: 0;
  margin-top: 8px;
  display: flex;
  color: #999;
  font-size: 12px;
}
.item-author {
  color: #999;
  font-size: 12px;
  margin: 0;
  display: block;
  margin-right: 15px;
  & :nth-child(1) {
    & :nth-child(1) {
      font-size: 14px;
      font-weight: 700;
      font-style: italic;
      color: #f94d2a;
      margin: 0 2px;
    }
  }
}
.item-read-num {
  color: #999;
  font-size: 12px;
  margin: 0;

  display: block;
}
.item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  & :nth-child(1) {
    & :nth-child(1) {
      font-size: 14px;
      font-weight: 700;
      font-style: italic;
      color: #f94d2a;
      margin: 0 2px;
    }
  }
}
.item-info-box {
  user-select: none;
  font-size: 16px;
  margin: 0;
  display: flex;
  margin-top: 8px;
}
.item-desc-box {
  margin: 0;
  display: block;
  width: 65%;
  font-size: 14px;
  color: #555;
}
</style>
