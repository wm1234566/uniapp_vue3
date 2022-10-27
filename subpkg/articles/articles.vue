<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 16:51:51
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 09:55:50
 * @FilePath: \blog\subpkg\articles\articles.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->
<template>
  <!-- #ifndef H5 -->
  <page-meta
    root-font-size="52px"
    :style="{ display: 'block !important', overflowX: 'hidden' }"
  >
    <!-- #endif -->
    <view class="articles">
      <view class="detail-container">
        <view class="title">{{ articleData.articleTitle }}</view>

        <view class="detail-info">
          <view class="detail-left">
            <view class="avatar-box">
              <image
                :src="articleData.avatar"
                mode="scaleToFill"
                class="avatar"
                referrerpolicy="no-referrer"
              />
            </view>
            <view class="author-box">
              <text class="author">{{ articleData.nickName }}</text>
              <text class="release-time">{{ articleData.date }}</text>
            </view>
          </view>
          <view class="detail-right">
            <button
              open-type=""
              size="mini"
              hover-class="button-hover"
              @click="Follow(!articleData.isFollow ? true : false)"
              class="follow"
              :loading="isFollowLoading"
              :type="!articleData.isFollow ? 'default' : 'primary'"
            >
              {{ !articleData.isFollow ? "关注" : "已关注" }}
            </button>
          </view>
        </view>
        <view class="markdown_views _root">
          <mp-html
            class="markdown_views"
            :content="
              articleData.content ? addClassFromHTML(articleData.content) : null
            "
          />
        </view>

        <view class="comment-box">
          <view class="comment-limt-container">
            <view class="comment-title">精简评论</view>

            <view
              v-for="(item, index) in commentData"
              :key="item.info.avatar"
              class="comment-item-container"
            >
              <view class="avatar-box">
                <image
                  class="avatar"
                  :src="item.info.avatar"
                  mode="scaleToFill"
                />
              </view>
              <view class="info-box">
                <text class="comment-user">{{ item.info.nickName }}</text>
                <text class="comment-info">{{ item.info.content }}</text>
                <text class="comment-time">{{
                  TransformDate(item.info.dateFormat)
                }}</text>
              </view>
            </view>
          </view>
          <!-- 展示更多 -->
          <uni-load-more
            :color="color"
            :status="status"
            v-if="isShow"
            :content-text="contentText"
            @clickLoadMore="getList"
          />
        </view>

        <view class="operate-container">
          <view class="comment-box" @click="popup">
            <mySearch
              ref="mysearch"
              :Icon="inputIcon1"
              Showtext="评论一句，前排打call..."
            ></mySearch
          ></view>
          <view class="options-box">
            <view class="praise-box">
              <image
                v-if="!articleData.isPraise"
                class="img"
                src="@/static/images/un-praise.png"
                mode="scaleToFill"
              />

              <image
                v-else
                class="img"
                src="@/static/images/praise.png"
                mode="scaleToFill"
              />

              <text class="txt">点赞</text>
            </view>
          </view>
          <veiw class="options-box">
            <view class="praise-box">
              <image
                v-if="!articleData.isCollect"
                class="img"
                src="@/static/images/un-collect.png"
                mode="scaleToFill"
              />

              <image
                v-else
                class="img"
                src="@/static/images/collect.png"
                mode="scaleToFill"
              />

              <text class="txt">收藏</text>
            </view>
          </veiw>
        </view>
      </view>

      <uni-popup ref="popup" type="bottom" background-color="#fff">
        <view class="comment-container">
          <textarea
            class="textarea"
            placeholder-style="color:#808080"
            placeholder="说点什么..."
            confirm-type="send"
          />
          <button class="mini-btn" type="primary" size="mini">发送</button>
        </view>
      </uni-popup>
    </view>
    <!-- #ifndef H5 -->
  </page-meta>
  <!--#endif-->
</template>

<script>
// import img from "../../static/images/empty-data.png";
import {
  getArticleDetail,
  getArticleComment,
  userFollow,
} from "@/api/article.js";

import "@/styles/article-detail.scss";

import { mapState, mapMutations } from "vuex";
import inputIcon from "@/static/images/input-icon.png";
import mySearch from "@/components/Search/index.vue";
import { getImage } from "@/api/requestImg.js";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);

dayjs.locale("zh-cn");

import store from "@/store/index.js";

export default {
  data() {
    return {
      articleData: {}, //文章数据
      commentData: {}, //评论数据

      contentText: {
        contentdown: "查看更多评论",
        contentrefresh: "加载中",
        contentnomore: "---我也是有底线的---",
      },
      pageIndex: 1, //评论的当前页数
      pageCount: 1, //总页数
      color: "#007AFF", // 搜索框的背景颜色
      status: "more", // 加载更多组件的默认状态
      inputIcon1: inputIcon, // 加载本地图标为参数
      isShow: true, //是否展示展示更多
      isFollowLoading: false, //关注按钮的动画
      author: "", //文章作者
    };
  },

  mounted() {
    // this.$refs.mysearch.placeholder = "zhes";
    // console.log("ref", this.$refs.mysearch.placeholder);
  },
  components: {
    mySearch,
  },
  computed: {
    ...mapState("User", ["userInfo"]),
  },

  methods: {
    ...mapMutations("User", ["removeState"]),

    /**
     * @description:点击关注
     * @return {*}
     */
    Follow(value) {
      //console.log("登陆数据", store.state.User.userInfo);

      this.isFollowLoading = true; //开始转圈圈
      userFollow(this.author, value).then(
        (data) => {
          console.log("登陆数据", data);
          if (data.success == true) {
            this.isFollowLoading = false;
            this.articleData.isFollow = !this.articleData.isFollow;
          }
        },
        (err) => {
          this.isFollowLoading = false;
        }
      );
    },
    /**
     * @description:点击获得评论
     * @return {*}
     */
    getList() {
      console.log("触发点击事件");
      if (this.pageCount >= this.pageIndex + 1) {
        getArticleComment(this.articleData.articleId, this.pageIndex + 1).then(
          (data) => {
            // console.log("评论数据", data);
            this.commentData.push(...data.data.list);
            this.pageIndex++;
          },
          (err) => {}
        );
        this.isShow = false;
      } //没有更多了
      else {
        this.isShow = true;
        this.status = "no-more";
        this.color = "";
      }
    },

    /**
     * @description:点击弹出弹窗
     * @return {*}
     */
    popup() {
      this.$refs.popup.open();
    },
    /**
     * 为所有的 DOM 增加类名
     */
    addClassFromHTML(info) {
      return info
        .replace(/<p>/gi, '<p class="p-cls">')
        .replace(/<a>/gi, '<a class="a-cls">')
        .replace(/<h1>/gi, '<h1 class="h1-cls">')
        .replace(/<h2>/gi, '<h2 class="h2-cls">')
        .replace(/<h3>/gi, '<h3 class="h3-cls">')
        .replace(/<h4>/gi, '<h4 class="h4-cls">')
        .replace(/<h5>/gi, '<h5 class="h5-cls">')
        .replace(/<h6>/gi, '<h6 class="h6-cls">')
        .replace(/<ul>/gi, '<ul class="ul-cls">')
        .replace(/<li>/gi, '<li class="li-cls">')
        .replace(/<ol>/gi, '<ol class="ol-cls">')
        .replace(/<td>/gi, '<td class="td-cls">')
        .replace(/<th>/gi, '<th class="th-cls">')
        .replace(/<tr>/gi, '<tr class="tr-cls">')
        .replace(/<dl>/gi, '<dl class="dl-cls">')
        .replace(/<dd>/gi, '<dd class="dd-cls">')
        .replace(/<hr>/gi, '<hr class="hr-cls">')
        .replace(/<pre>/gi, '<pre class="pre-cls">')
        .replace(/<strong>/gi, '<strong class="strong-cls">')
        .replace(/<input>/gi, '<input class="input-cls">')
        .replace(/<table>/gi, '<table class="table-cls">')
        .replace(/<details>/gi, '<details class="details-cls">')
        .replace(/<code>/gi, '<code class="code-cls">')
        .replace(/<kbd>/gi, '<kbd class="kbd-cls">')
        .replace(/<summary>/gi, '<summary class="summary-cls">')
        .replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
        .replace(/<img/gi, '<img class="img-cls"');
    },

    TransformDate(date) {
      // dayjs().from(dayjs("1990-01-01")); // 31 年后
      // dayjs().from(dayjs("1990-01-01"), true); // 31 年
      // dayjs().fromNow();

      return dayjs().to(dayjs(date)); // 31 年前
    },
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
    //. console.log("下拉触底", ...ags);
    ///     this.ReachBottom++;
    if (!this.isShow) {
      this.getList();
    }
  },

  onLoad: function ({ author, articleId }) {
    //option为object类型，会序列化上个页面传递的参数
    // console.log(option.author); //打印出上个页面传递的参数。
    // console.log(option.articleId); //打印出上个页面传递的参数。
    this.author = author;
    getArticleDetail(author, articleId).then(
      (data) => {
        console.log("请求的文章数据", data);
        this.articleData = data.data.data;
      },
      (err) => {}
    );
    getArticleComment(articleId).then(
      (data) => {
        console.log("评论数据", data);
        this.commentData = data.data.list;
        this.pageCount = data.data.pageCount;
      },
      (err) => {}
    );
  },
};
</script>

<style lang="scss">
//@import "../../styles/article-detail.scss"; //~@表示根目录

.detail-container {
  font-size: 16px;
  margin: 0;
  display: block;
  padding: 8px 10px;
  padding-bottom: 108px;
}
.title {
  margin: 0;
  display: block;
  font-size: 20px;
  color: #000;
  font-weight: 700;
}
.detail-info {
  font-size: 16px;
  margin: 0;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  .detail-left {
    font-size: 16px;
    margin: 0;
    display: flex;
    .avatar-box {
      font-size: 16px;
      margin: 0;
      display: block;
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
    }
    .author-box {
      font-size: 16px;
      margin: 0;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .author {
        margin: 0;
        font-size: 14px;
        font-weight: bolder;
        color: #2c405a;
      }
      .release-time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .detail-right {
    font-size: 16px;
    margin: 0;
    display: flex;
    align-items: center;
  }
}

.follow {
  // display: flex;
  flex-wrap: nowrap;
  height: 30px;
  position: relative;
}

/* #ifdef MP-WEIXIN */

.follow::before {
  position: absolute;
  top: 13rpx;
  left: 1rpx;
}
/* #endif */

.comment-box {
  font-size: 16px;
  margin: 0;

  display: block;
}
.comment-limt-container {
  font-size: 16px;
  margin: 0;
  display: block;
}
.comment-title {
  display: block;
  font-weight: 700;
  color: #000;
  font-size: 16px;
  margin: 12px 0;
}
.comment-item-container {
  font-size: 16px;
  margin: 0;
  padding: 12px 0;
  display: flex;
}

.avatar-box {
  font-size: 16px;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: block;
}
.info-box {
  font-size: 16px;
  margin: 0;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}
.avatar {
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
}
.comment-user {
  margin: 0;
  font-size: 12px;
  font-weight: bolder;
  color: #333;
}
.comment-info {
  margin: 0;

  margin-top: 4px;
  font-size: 14px;
  color: #333;
}
.comment-time {
  margin: 0;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}
:deep(.uni-load-more__text) {
  margin: 0 !important; //让底部显示更多 居中
}

.operate-container {
  font-size: 16px;
  margin: 0;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding: 4px 6px 32px 6px;
  display: flex;
  border-top: 1px solid #f8f8f8;
  align-items: center;
}
.comment-box {
  font-size: 16px;
  margin: 0;
  display: block;
  flex-grow: 1;
}
.options-box {
  font-size: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}
:deep(.Search) {
  width: auto !important;
  height: auto !important;
  padding: 0 10px !important;
  margin: 0 !important;
  border: 0 !important;
  font-size: 12px;
  display: flex;
  // justify-items: center;
  align-items: center;
  // border: 1px solid;
  background-color: rgb(238, 237, 244);

  & .search-icon {
    width: 20px !important;
    height: 20px !important;
    margin: 0 5px !important;
  }
  & .text {
    font-size: 12px !important;
    line-height: 28px !important;
    align-self: flex-start;
    color: rgb(166, 165, 171);
  }
}
.praise-box {
  font-size: 22px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img {
  font-size: 22px;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 26px;
  height: 26px;
  color: #333;
}
.txt {
  margin: 0;
  font-size: 12px;
  color: #333;
}
.comment-container {
  padding: 10px;
  height: 150px;
  display: flex;
  flex-flow: column;
}
.textarea {
  width: 100% !important;
  height: 120px !important;
  font-size: 14px;
  padding: 6px 0 10px 0;
  box-sizing: border-box;
  word-break: break-word; //自动换行
}
.mini-btn {
  align-self: flex-end;
  display: inline-block !important;
  // width: 200px;
  margin: 0 !important;
  background-color: rgba(0, 122, 255, 0.6);
}
</style>
