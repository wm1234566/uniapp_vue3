<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 16:51:51
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 20:24:25
 * @FilePath: \blog\subpkg\maps\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
-->
<template></template>

<script>

export default {
  data() {
    return {

    };
  },

  mounted() {

  },
  components: {

  },
  computed: {
    ...mapState("User", ["userInfo"]),
  },

  methods: {
    ...mapMutations("User", ["removeState"]),



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

<style lang="scss"></style>
