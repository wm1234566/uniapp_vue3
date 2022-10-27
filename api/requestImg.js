/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-11 16:27:54
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-11 16:39:08
 * @FilePath: \blog\api\requestImg.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
 */
// 可以放到utils中 
export async function getImage(Imgurl) {
    let res = await new Promise(function (resolve, reject) {
        uni.downloadFile({
            url: Imgurl, // 这里是你接口地址 若要传参 直接 url拼接参数即可
            header: {
                //source_of_request: 'home_page', // 这里是要添加的请求头
                referer: ""
            },
            success: (res) => {
                // res.tempFilePath; // 这里拿到后端返回的图片路径
                console.log(res);

                resolve(res); // 数据处理完成
            },
            fail: () => {
                uni.hideLoading();
                reject('失败'); // 数据处理出错
            },
        });
        // 一段耗时的异步操作
    });

    return res
}
