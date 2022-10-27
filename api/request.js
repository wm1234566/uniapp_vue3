/*
 * @Description:
 * @Author: shuliang
 * @Date: 2022-06-21 15:58:08
 * @LastEditTime: 2022-08-02 09:38:24
 * @LastEditors: shuliang
 */
/* eslint-disable @typescript-eslint/ban-types */

import md5 from 'md5'


const Url = "https://api.imooc-blog.lgdsunday.club";///import.meta.env.VITE_API_URL
export function zconfirm(msg, callBackFun) {

    uni.showModal({
        content: msg,
        success: function (res) {
            if (res.confirm) {
                callBackFun(true)
            } else if (res.cancel) {
                callBackFun(false)
            }
        },
    })

}

export function zalert(msg, callBackFun) {
    uni.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
        success: function () {
            if (callBackFun) {
                callBackFun()
            }
        },
    })
}
export function toast(msg) {
    uni.showToast({
        title: msg,
        duration: 2000,
        mask: false,
        icon: 'none',
    })
}

export const deepClone = function (origin, target = {}) {
    for (const prop in target) {
        if (target[prop] !== null && typeof target[prop] === 'object') {
            origin[prop] = Object.prototype.toString.call(target[prop]) === '[object Array]' ? [] : {}
            deepClone(origin[prop], target[prop])
        } else {
            origin[prop] = target[prop]
        }
    }
}






// 验证登录情况
// function ajaxFilter(data) {
//   let status = true
//   if (data.code == 401) {
//     status = false
//     // cosn
//     zalert('登录状态失效', () => {
//       uni.removeStorageSync('token')
//       uni.reLaunch({
//         url: '/pages/login/index',
//       })
//     })
//   }
//   return status
// }
/**
 * 发送请求
 */
const baseRequest = (config) => {
    if (!config.showLoading) {
        uni.showLoading({
            title: '加载中...',
            mask: true,
        })
    }

    if (config.method === 'GET' && config.params) {
        let url = config.url + '?'
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            const part = encodeURIComponent(propName) + '='
            if (value !== null && typeof value !== 'undefined') {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        const params = propName + '[' + key + ']'
                        const subPart = encodeURIComponent(params) + '='
                        url += subPart + encodeURIComponent(value[key]) + '&'
                    }
                } else {
                    url += part + encodeURIComponent(value) + '&'
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }



    const token = uni.getStorageSync('token')

    if (config.header) {
        config.header.Authorization = 'Bearer ' + token
    } else {
        config.header = {
            Authorization: 'Bearer ' + token,
        }
    }

    // 添加验证
    let e = parseInt(Date.now() / 1e3),
        n = e + 'LGD_Sunday-1991-uni'
    config.header.codetype = e
    config.header.icode = md5(n)

    return new Promise((reslove, reject) => {


        // uni.showLoading({
        //     title: '加载中',
        //     mask: true,
        // })

        uni.request({
            url: Url + config.url,
            method: config.method || 'GET',
            header: config.header,
            data: config.data || {},

            success: (res) => {
                // console.log('res', res)

                if (!config.showLoading) {
                    uni.hideLoading()
                }

                if (res.statusCode == 200) {
                    reslove(res.data)
                } else if (res.data.code != 401) {
                    toast(res.data.msg)
                    reject(res)
                }
            },

            fail: (res) => {
                if (!config.showLoading) {
                    uni.hideLoading()
                }
                if (res.msg && res.msg.indexOf('timeout') !== -1) {
                    zalert('请求超时，请稍后再试')
                } else if (res.msg && res.msg.indexOf('request') !== -1) {
                    zalert('服务器已关闭')
                } else {
                    zalert('请求失败，请检查网络')
                }
                reject('请求失败')
            },
        })
    })
}

export default baseRequest
