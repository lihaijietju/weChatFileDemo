//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        empty: '请点击您要查看的文件',
        fileList: [],
        fileListUrl: [],
        url: ''
    },
    //获取本地存储的图片
    onShow: function () {
        var that = this;

        var fileList = wx.getStorageSync('fileList') || [];
        that.setData({
            fileListUrl: fileList
        });

        var arr = [];
        for (var i = 0; i < fileList.length; i++) {
            arr.push('...' + fileList[i].substr(-10, 10));
        }

        that.setData({
            fileList: arr
        });
    },
    radioChange: function (e) {
        var that = this;
        that.setData({
            url: this.data.fileListUrl[Number(e.detail.value)]
        });
    },
    openFile: function () {
        var url = this.data.url || '';
        if (!url) {
            wx.showToast({
                title: '请选择文件',
                icon: 'success',
                duration: 2000
            });
            setTimeout(function () {
                wx.hideToast();
            }, 1000);
            return;
        } else {
            wx.openDocument({
                filePath: url,
                success: function () {
                    wx.showToast({
                        title: '打开成功',
                        icon: 'success',
                        duration: 2000
                    });
                    setTimeout(function () {
                        wx.hideToast();
                    }, 1000);
                }
            });
        }
    }
});
