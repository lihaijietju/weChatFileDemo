//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        empty: '请点击您要查看的图片查看详情',
        imgSrcs: []
    },
    //获取本地存储的图片
    onShow: function () {
        var imgList = wx.getStorageSync("imgSrcs");
        var that = this;
        that.setData({
            imgSrcs: imgList
        });
    },
    lookImg: function (event) {
        console.log(event.target.dataset.src);
        wx.navigateTo({
            url: '/pages/lookImg/lookImg?src=' + event.target.dataset.src
        })
    }

})