<!-- 组件描述:  -->
<template>
  <view>
    <view class="list1" @click="detailArticle(itemdata)">
      <view class="listData">
        <view class="icon">
          <!-- <img class="img1" src="@/static/images/ranking-1.png" alt="" /> -->

          <image
            class="img1"
            src="@/static/images/ranking-1.png"
            aspectFit
            v-if="index === 0"
          ></image>

          <image
            class="img1"
            src="@/static/images/ranking-2.png"
            aspectFit
            v-else-if="index === 1"
          ></image>

          <image
            class="img1"
            src="@/static/images/ranking-3.png"
            aspectFit
            v-else-if="index === 2"
          ></image>

          <image
            class="img1"
            src="@/static/images/ranking-other.png"
            aspectFit
            v-else
          ></image>

          <text
            class="number"
            :style="{ color: index > 2 ? '#333' : '#fff' }"
            >{{ index + 1 }}</text
          >
        </view>
        <view class="content">
          <text class="title">{{ itemdata.title }}</text>
          <view class="summary">{{ itemdata.desc }}</view>

          <view class="articleInf">
            <text class="author">{{ itemdata.nickname }}</text>

            <view>
              <!-- <img class="img2" src="@/static/images/hot-icon.png" alt="" /> -->

              <image
                class="img2"
                src="@/static/images/hot-icon.png"
                aspectFit
              ></image>

              <text class="hot">{{
                parseInt(itemdata.views / 1000) < 1
                  ? itemdata.views + "热度"
                  : parseInt(itemdata.views / 1000) + "k热度"
              }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ListItem",
  data() {
    return {};
  },
  props: {
    index: {
      // 循环的id
      type: Number,
      default: 0,
    },
    //当前项的数据
    itemdata: {
      type: Object,
      default: {},
    },
  },
  methods: {
    detailArticle(item) {
      // console.log("输出的数据", item);
      uni.navigateTo({
        url: `/subpkg/articles/articles?author=${item.user_name}&articleId=${item.id}`,
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list1 {
  //   width: 730rpx;
  margin: 0 auto;
  //   height: 256rpx;

  padding-bottom: 24rpx;
  cursor: grab;
}

.listData {
  overflow: hidden;
  height: 100%;
  padding: 30rpx 16rpx;
  margin: 0 16rpx;
  //   margin: 0 auto;
  display: flex;
  flex-flow: nowrap row;
  //   background-color: aqua;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 10rpx;
  //   border: 1px solid #e4e7ed;
  .icon {
    // width: 18;
    margin-right: 10rpx;

    position: relative;
    display: inline-block;

    & .number {
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      line-height: 18px;
    }
    & .img1 {
      width: 18px;
      height: 18px;

      display: inline-block;
    }
  }
  .content {
    width: 91%;
    .title,
    .summary {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left; // 两端对齐
    }
    .title {
      color: #000;
      font-weight: 700;
      font-size: 16px;
    }
    .summary {
      font-size: 14px;

      // display: block;
    }
    .author {
      color: #999;
      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }
  }
}
.articleInf {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 12px;
  width: 100%;

  .img2 {
    vertical-align: middle;
    margin-right: 10rpx;
    width: 18px;
    height: 18px;
  }
  .hot {
    vertical-align: middle;
    color: #f94d2a;
  }
}
</style>
