<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 15:24:03
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 23:05:06
 * @FilePath: \blog\pages\hot-video\hot-video.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="hot-video">
    <videoItem
      v-for="(item, index) in videoData"
      :key="item.id"
      :VideoItem="item"
      :isClick="true"
      @playing="play"
      @pause="pause"
    ></videoItem>
    <uni-load-more
      v-if="isLastPage"
      status="no-more"
      :content-text="contentText"
    />
  </view>
</template>

<script>
import videoItem from "@/components/videoItem/index.vue";
import { getHotVideoList } from "@/api/video.js";
export default {
  data() {
    return {
      videoData: [],
      currentPage: 1, //当前页
      isLastPage: false, //是否是最后一页
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中",
        contentnomore: "---没有更多---",
      },
      videoContext: [], //视频的上下文数组
    };
  },

  components: {
    videoItem,
  },
  // unmounted() {
  //   console.log("卸载组件");
  // },
  onHide() {
    console.log("离开页面");
    //这种方式没用
    this.videoContext.forEach((item, index) => {
      ///console.log("视频的Context", item);
      item.pause(); //关掉有视频
    });
    // 关闭长亮
    uni.setKeepScreenOn({
      keepScreenOn: false,
    });
  },
  onTabItemTap(object) {
    console.log("离开页面1", object);
    this.videoContext.forEach((item, index) => {
      ///console.log("视频的Context", item);
      item.pause(); //关掉有视频
    });
  },
  methods: {
    play(id) {
      //有人播放视频，将屏幕长亮
      console.log("执行了播放视频", id, this.videoContext);
      uni.setKeepScreenOn({
        keepScreenOn: true,
      });

      this.videoContext.forEach((item, index) => {
        if (item.id != id) {
          item.pause(); //关掉其他的视频
        }
      });
    },

    pause(id) {
      //屏幕不长亮
      uni.setKeepScreenOn({
        keepScreenOn: false,
      });
    },
  },

  async created() {
    let res = await getHotVideoList(1, 5);
    // console.log("res", res);

    this.videoData = res.data.list;

    // 给视频创建上下文方法

    this.videoData.forEach((item, index) => {
      this.videoContext.push(uni.createVideoContext("myVideo" + item.id, this));
    });

    // // 所有视频都播放
    // this.videoContext.forEach((item) => {
    //   item.play();
    // });
    // let timer = null;
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   this.videoContext.forEach((item) => {
    //     item.pause();
    //   });
    // }, 3000);

    console.log("所以视频的Context", this.videoContext);
  },

  //下拉监听
  onPullDownRefresh() {
    getHotVideoList(1, 5).then(
      (data) => {
        this.videoData = data.data.list;
        // 给视频创建上下文方法

        this.videoData.forEach((item, index) => {
          this.videoContext.push(
            uni.createVideoContext("myVideo" + item.id, this)
          );
        });

        uni.stopPullDownRefresh(); //停止刷新
      },
      (err) => {
        uni.stopPullDownRefresh(); // 停止刷新
      }
    );
  },
  //上拉更新
  onReachBottom() {
    if (!this.isLastPage)
      getHotVideoList(this.currentPage + 1, 5).then(
        (data) => {
          if (data.data.list.length < 5) {
            this.isLastPage = true;
          } else {
            this.currentPage++;
          }
          this.videoData.push(...data.data.list);
          // 给视频创建上下文方法

          this.videoData.forEach((item, index) => {
            this.videoContext.push(
              uni.createVideoContext("myVideo" + item.id, this)
            );
          });
        },
        (err) => {}
      );
  },
};
</script>

<style lang="scss"></style>
