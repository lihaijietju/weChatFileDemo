//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        url: ''
    },
    downloadExample: function () {
        wx.downloadFile({
            url: 'https://lihaijietju.github.io/jakii/test.pdf',
            success: function (res) {
                var tempPath = res.tempFilePath;
                wx.saveFile({
                    tempFilePath: tempPath,
                    success: function (res) {
                        var savedFilePath = res.savedFilePath;

                        var fileList = wx.getStorageSync('fileList') || [];
                        fileList.unshift(savedFilePath);
                        wx.setStorageSync('fileList', fileList);

                        wx.showToast({
                            title: '下载成功',
                            icon: 'success',
                            duration: 2000
                        });

                        setTimeout(function () {
                            wx.hideToast();
                        }, 1000)
                    }
                })
            }
        })
    },
    lookFileList: function () {
        wx.navigateTo({
            url: '/pages/fileList/fileList'
        })
    },
    setUrl: function (event) {
        var that = this;
        that.setData({
            url: event.detail.value
        });
    },
    downloadFile: function () {
        if (this.data.url) {
            wx.downloadFile({
                url: this.data.url,
                success: function (res) {
                    var tempPath = res.tempFilePath;
                    wx.saveFile({
                        tempFilePath: tempPath,
                        success: function (res) {
                            var savedFilePath = res.savedFilePath;

                            var fileList = wx.getStorageSync('fileList') || [];
                            fileList.unshift(savedFilePath);
                            wx.setStorageSync('fileList', fileList);

                            wx.showToast({
                                title: '下载成功',
                                icon: 'success',
                                duration: 2000
                            });

                            setTimeout(function () {
                                wx.hideToast();
                            }, 1000)
                        },
                        fail: function () {
                            wx.showToast({
                                title: '保存文件失败',
                                icon: 'success',
                                duration: 2000
                            });

                            setTimeout(function () {
                                wx.hideToast();
                            }, 1000)
                        }
                    })
                },
                fail: function () {
                    wx.showToast({
                        title: '下载失败，请重试',
                        icon: 'success',
                        duration: 2000
                    });

                    setTimeout(function () {
                        wx.hideToast();
                    }, 1000)
                }
            })


        }
    }
})