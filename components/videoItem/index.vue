<template>
  <view class="hot-video-item-container">
    <view class="video-box">
      <!-- @error="videoErrorCallback" -->

      <video
        :id="'myVideo' + VideoItem.id"
        :src="VideoItem.play_url"
        enable-danmu
        danmu-btn
        controls
        object-fit="contain"
        class="video"
        page-gesture
        enable-progress-gesture
        mobilenet-hint-type
        enable-play-gesture
        auto-pause-if-navigate
        auto-pause-if-open-native
        http-cache
        @play="Playing('myVideo' + VideoItem.id)"
        @pause="Pause('myVideo' + VideoItem.id)"
        @error="Pause('myVideo' + VideoItem.id)"
      >
        <!-- #ifdef APP-PLUS -->
        <cover-view class="cover-view">
          <cover-view class="container"> {{ VideoItem.title }} </cover-view>
        </cover-view>
        <!-- #endif -->
      </video>
    </view>
    <view>
      <!-- 下面作者信息 isClick ? ToDetail : null-->
      <view class="hot-video-info-container" @click="ToDetail">
        <view class="video-title">{{ VideoItem.title }}</view>
        <view class="video-info">
          <view class="author-box">
            <image
              class="avatar"
              :src="VideoItem.author_avatar"
              mode="scaleToFill"
            />
            <text class="author-txt">{{ VideoItem.source_name }}</text>
          </view>
          <view class="barrage-box">
            <!-- < class=""></> -->
            <uni-icons type="videocam" size="16"></uni-icons>
            <text class="barrage-num">{{ VideoItem.fmplaycnt }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import mySearch from "../../components/Search/index.vue";
// import Tabs from "../../components/Tabs/index.vue";
// import SwiperList from "../../components/SwiperList/index.vue";
// import { getTabs } from "../../api/hot.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },

  props: {
    VideoItem: {
      type: Object,
      default: {},
    },
    //是否能点击作者形象看详情
    isClick: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},

  methods: {
    ...mapMutations("Video", ["setVideoItem"]),
    ToDetail() {
      // console.log("点击", this);
      uni.navigateTo({
        url: `/subpkg/video-details/index`,
        success: () => {
          this.setVideoItem(this.VideoItem);
        },
      });
    },
    Playing(id) {
      ///  console.log("开始播放", id);
      this.$emit("playing", id);
    },
    Pause(id) {
      //暂停或者出错都让屏幕暗下来
      this.$emit("pause", id);
    },
  },
};
</script>

<style lang="scss">
// .tab-sticky {
// }
.hot-video-item-container {
  font-size: 16px;
  margin: 0;
  display: block;
  margin-bottom: 12px;
  position: relative;
}
.video-box {
  font-size: 16px;
  margin: 0;
  display: block;
}
.video {
  font-size: 16px;
  margin: 0;
  display: inline-block;
  line-height: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 230px;
}
.hot-video-info-container {
  font-size: 16px;
  margin: 0;
  display: block;
}
.video-title {
  margin: 0;
  display: block;
  position: absolute;
  top: 24px;
  left: 15px;
  color: #fff;
  font-size: 16px;
}

.video-info {
  font-size: 16px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 4px 15px;
}
.author-box {
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
}
.avatar {
  font-size: 16px;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
}
.author-txt {
  margin: 0;
  margin-left: 5px;
  font-size: 14px;
  color: #333;
  font-weight: 700;
}
.barrage-box {
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
}
.barrage-num {
  margin: 0;
  margin-left: 5px;
  font-size: 12px;
  color: #333;
}
//视频的标题
.container {
  font-size: 14px;
  color: #fff;
}
</style>
