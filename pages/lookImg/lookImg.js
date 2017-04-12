//index.js
//获取应用实例
var util = require('../../util/util.js')

var app = getApp()
Page({
    data: {
        imgSrc: '',
        width: 0,
        height: 0,
        size: 0,
        time: 0
    },
    onLoad: function (options) {
        // console.log(options);
        var that = this;
        that.setData({
            imgSrc: options.src
        });

        wx.getImageInfo({
            src: options.src,
            success: function (res) {
                that.setData({
                    width: res.width,
                    height: res.height
                });
            }
        });
        wx.getSavedFileInfo({
            filePath: options.src, //仅做示例用，非真正的文件路径
            success: function (res) {
                var time = util.dateFormat(new Date(res.createTime * 1000), 'yyyy-MM-dd hh:mm:ss')

                that.setData({
                    size: (res.size / 1024).toFixed(2),
                    time: time
                });
            }
        })


    },
    //获取本地存储的图片
    onShow: function () {
        var imgList = wx.getStorageSync("imgSrcs");
        var that = this;
        that.setData({
            imgSrcs: imgList
        });

    }

})