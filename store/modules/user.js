/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 16:09:26
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-14 12:15:11
 * @FilePath: \Blog\blog\store\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 16:09:26
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 18:18:51
 * @FilePath: \Blog\blog\store\modules\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 16:09:26
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 15:52:24
 * @FilePath: \blog\store\modules\user.js
 * @Description: 
 * 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
 */
import { login } from "@/api/user.js"

export default
    {
        namespaced: true,
        state() {
            return {
                userInfo: uni.getStorageSync("userInfo") || {},
                token: uni.getStorageSync("token") || ""
            }
        },
        mutations:
        {

            setUserInfo(state, value) {
                state.userInfo = value
            },
            setToken(state, value) {
                state.token = value
            },
            deleteToke(state) {
                state.token = null
            },
            deleteUserInfo(state) {
                state.userInfo = {};
            }

        },

        actions: {
            async getLoginInfo({ dispatch, commit }, { signature, iv, userInfo }) {

                console.log("xx", userInfo);
                let { nickName, city, province, avatarUrl, gender } = userInfo



                try {


                    let result = await login({ signature, iv, nickName, city, province, avatarUrl, gender })


                    //console.log("xx1", result);
                    const token = uni.getStorageSync('token')


                    uni.setStorage({
                        key: 'token',
                        data: result.data.token.split(" ")[1],
                        success: function () {
                            commit('setToken', result.data.token)
                            commit("setUserInfo", userInfo)
                        },
                        fail: () => {
                            uni.showToast({
                                title: '设置token失败',
                                icon: 'none',
                                mask: true
                            })

                        }
                    });
                    uni.setStorage({
                        key: 'userInfo',
                        data: userInfo,
                        success: function () {

                        },
                        fail: () => {
                            uni.showToast({
                                title: '设置token失败',
                                icon: 'none',
                                mask: true
                            })

                        }
                    });



                } catch (error) {
                    uni.showModal({
                        title: '错误提示',
                        content: '登陆失败！请重试',
                        success: function (res) {
                            if (res.confirm) {
                                //console.log('用户点击确定');
                            } else if (res.cancel) {
                                /// console.log('用户点击取消');
                            }
                        }
                    });
                }



            }

        },

    }