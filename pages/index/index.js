//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: '欢迎你，',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });
        var imgList = wx.getStorageSync("imgSrcs");
        if(!imgList){
            wx.setStorageSync("imgSrcs", []);
        }
    },
    loadImg: function () {
        var that = this;
        wx.downloadFile({
            url: 'https://lihaijietju.github.io/jakii/test.pdf',
            success: function (res) {
                var fileTempPath = res.tempFilePath;

                wx.openDocument({
                    filePath: fileTempPath,
                    success: function (res) {
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: function (err) {
                        console.log(err)
                    }
                });
            }
        })
    }
})