<!-- 组件描述:  -->
<template>
  <!-- 横向滚动条 :scroll-into-view="'demo' + SelectionID"-->

  <view class="tabs">
    <scroll-view
      class="scroll-view_H"
      scroll-x="true"
      show-scrollbar="false"
      scroll-with-animation
      :scroll-left="ItemOffsetLeft"
    >
      <view class="tabs-content">
        <block v-for="(item, index) in tabsData" :key="'sss' + item._id">
          <view
            :id="'demo' + index"
            class="scroll-view-item_H"
            :style="index === SelectionID ? SelectItem : null"
            @click="select(item, index, $event)"
            >{{ item.label }}
          </view>
        </block>
        <view
          class="bar"
          :style="{
            width: `${ItemWidth}px`,
            transform: `translate(${ItemOffsetLeft}px,5px)`,
            heigth: `${defaultBar.heigth}`,
            backgroundColor: `${defaultBar.backgroundColor}`,
          }"
        >
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref, toRefs, onBeforeMount, onMounted, watch } from "vue";

export default {
  data() {
    return {
      SelectionID: -1, // 当前激活项
      styleObject: {},
      ItemWidth: 0,
      ItemOffsetLeft: 0, //bar
      scrollLeft: 0, //滚动条滚动的距离
    };
  },

  props: {
    tabsData: {
      type: Array,
      default: [],
    },
    SelectItem: {
      //定义选择项样式
      type: Object,
      default: {
        color: "red",
        "font-size": "30rpx",
      },
    },
    // 定义下面bar的样式
    defaultBar: {
      type: Object,
      default: {
        backgroundColor: "red",
        heigth: "2px",
      },
    },
    //激活项
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    // methods中的函数不能使用箭头函数
    select(item, index, e) {
      this.$emit("tabClick", index); //最新的下标

      this.SelectionID = index;

      const query = uni.createSelectorQuery().in(this);

      this.ItemOffsetLeft = e.target.offsetLeft;

      query
        .select(`#${e.target.id}`)
        .boundingClientRect((data) => {
          // console.log("得到布局位置信息" + JSON.stringify(data));

          this.ItemWidth = parseInt(data.width);

          // this.scrollLeft = this.SelectionID * this.ItemWidth
          this.scrollLeft = this.ItemOffsetLeft;
          // console.log("距离", this.scrollLeft)

          // console.log("点击1", data)
        })
        .exec();
    },
  },

  watch: {
    defaultIndex: {
      handler(newValue) {
        // console.log("触发没有", newValue);
        //的到传递过来的最新值

        // 模拟用户点击
        // let e = document.createEvent("MouseEvents");
        // e.initEvent("click", true, true);
        // if (document.getElementById("demo" + newValue)) {
        //   //模拟用户点击
        //   document.getElementById("demo" + newValue).dispatchEvent(e);
        // }

        this.SelectionID = newValue;

        const query = uni.createSelectorQuery().in(this);

        query
          .selectAll(`.scroll-view-item_H`)
          .boundingClientRect((data) => {
            if (Array.isArray(data)) {
              // this.ItemOffsetLeft = data.reduce((per, crurent, index) => {
              //   if (index < newValue) {
              //     return per + crurent.width;
              //   } else {
              //     return per;
              //   }
              // }, 0);
              let res = 0;
              data.forEach((item, index) => {
                if (index < newValue) {
                  res = res + item.width + 22.5; //22.5是margin
                }
              });
              this.ItemOffsetLeft = res;
              this.ItemWidth = data[newValue].width;
            }
            // console.log("点击sdfsdf", data);
          })
          .exec();
      },

      // immediate: true,
    },

    tabsData: {
      //tabsData，第一次获得数据说明，初始化完成，将第一个Demo的长度初始化， offsetLeft默认
      handler(newValue) {
        let query = uni.createSelectorQuery().in(this);
        setTimeout(() => {
          query
            .select("#demo0")
            .boundingClientRect((data) => {
              this.ItemWidth = parseInt(data.width);
            })
            .exec();
        });
      },
    },
  },
};
</script>
<style scoped lang="scss">
.tabs {
  width: 100%;
  white-space: nowrap;
  //吸顶效果

  position: sticky;
  top: -1px;
  z-index: 100;
  position: -webkit-sticky;

  /* #ifdef MP-WEIXIN */
  top: 0px;
  /* #endif */

  /* #ifdef H5 */
  top: 43px;
  /* #endif */

  overflow-x: hidden;

  // background-color: #f5f5f5;
  background-color: #fff;
}

.scroll-view_H {
  margin-top: 27rpx;
  margin-left: 25rpx;

  :deep(.tabs-content) {
    padding-bottom: 15rpx;
  }
}

.bar {
  // bar默认样式
  width: 10rpx;
  height: 4rpx;
  border: none;
  background-color: aqua;
  border-radius: 10rpx;
  // z-index: 100;
  transition: all 0.3s;
  transform: translate(0px, 5px);
}

.scroll-view-item_H {
  display: inline-block;
  margin-right: 22.5px;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  font-size: 30rpx;
}
</style>
