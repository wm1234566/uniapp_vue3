/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 14:54:51
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-15 10:00:47
 * @FilePath: \blog\main.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
 */

// #ifndef VUE3
import Vue from 'vue'
import App from './App'





Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})





app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from "./store/index"

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)
  return {
    app
  }
}
// #endif