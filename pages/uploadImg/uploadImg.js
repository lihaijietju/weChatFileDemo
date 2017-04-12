//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        title: '请选择要上传的文件'
    },
    //事件处理函数
    uploadImg: function () {
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 1000);

                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;

                var imgList = wx.getStorageSync("imgSrcs");
                var imgSrc = [];


                for (var i = 0; i < tempFilePaths.length; i++) {
                    wx.saveFile({
                        tempFilePath: tempFilePaths[i],
                        success: function (res) {
                            var savedFilePath = res.savedFilePath;
                            for (var j = 0; j < imgList.length; j++) {
                                imgSrc.push(imgList[j]);
                            }
                            imgSrc.unshift(savedFilePath)
                            wx.setStorageSync("imgSrcs", imgSrc);
                        }
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: '上传失败，请重新上传',
                    icon: 'success',
                    duration: 2000
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 1000);
            }
        })
    }
})