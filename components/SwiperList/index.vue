<!-- 组件描述: 轮播组件 -->
<template>
  <view class="uni-margin-wrap">
    <swiper
      class="swiper"
      :style="{ height: `${SwiperHeight}px` }"
      :current="LocationID"
      @change="IDChange($event)"
      @animationfinish="AnimaitonFinish"
    >
      <swiper-item
        v-for="(item, index) in total"
        :key="'sdfsd' + index"
        class="swiper-item"
      >
        <uni-load-more
          status="loading"
          iconType="circle"
          v-if="!ListData[index]"
        />

        <block v-else>
          <ListItem
            v-for="(item1, index1) in ListData[index]"
            :key="'item' + index1"
            :class="'ListItem_' + index"
            :itemdata="item1"
            :index="index1"
          >
          </ListItem>
        </block>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { ref, toRefs, onBeforeMount, onMounted } from "vue";
import ListItem from "@/components/ListItem/index.vue";
import { getList } from "@/api/hot";

export default {
  name: "SwiperList",
  components: {
    ListItem,
  },
  props: {
    currentID: {
      type: Number,
      default: 0,
    },
    total: {
      // 数量
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      LocationID: -1,
      ListData: [],
      // isLoading: true,
      SwiperHeight: 0, //当前项高度
    };
  },
  mounted() {
    this.updateListData(0);
  },
  watch: {
    currentID: {
      handler(newValue) {
        this.LocationID = newValue; //
      },

      immediate: true,
    },
    // total: {
    //   //初始化第一次
    //   async handler() {
    //     this.updateListData(0);
    //   },
    // },
  },
  methods: {
    //计算当前swiper高度
    computeSwiperHeight(newValue) {
      const query = uni.createSelectorQuery().in(this);

      query
        .selectAll(`.ListItem_${newValue}`)

        .boundingClientRect((data) => {
          if (Array.isArray(data)) {
            this.SwiperHeight = data.reduce(
              (per, crurent) => per + crurent.height,
              0
            );
          }
          // console.log("点击1", data, this.SwiperHeight);
        })
        .exec();
    },
    // swiper项滑动改变时
    IDChange({ detail }) {
      this.$emit("itemchange", detail.current);
    },

    /**
     * @description:
     * @param {*} current  //页数id
     * @param {*} type 不写表示如果这一页没有数据就更新，有值表示有数据也更新
     * @return {*}
     */
    async updateListData(current, type) {
      if (type) {
        this.ListData[current] = [];
        //有数据也更新
        let data = await getList(current); //没有数据
        this.ListData[current] = data.data.list; // 获得数据
      } else {
        let data = await getList(current); //没有数据
        this.ListData[current] = data.data.list; // 获得数据

        //渲染完了再计算高度
        setTimeout(() => {
          this.computeSwiperHeight(current);
          //如果这一页有数据，展示
        }, 10);
      }
    },
    AnimaitonFinish(
      { detail } //动画结束
    ) {
      this.updateListData(detail.current);
    },
  },
};
</script>

<style scoped lang="scss">
.uni-margin-wrap {
  height: 100%;
  width: 100%;
  overflow-x: hidden; //滑动底部的滚动
}
.swiper {
  height: 80vh;
  min-height: 80vh !important;
}
</style>
