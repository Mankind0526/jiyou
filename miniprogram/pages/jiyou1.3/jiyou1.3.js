// pages/jiyou1.3/jiyou1.3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },
  chooseImage: function (event) {
    var that = this;
    wx.chooseImage({
      count: 6,
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        for (var i in tempFilePaths) {
          that.data.images = that.data.images.concat(tempFilePaths[i])
        }
        // 设置图片
        that.setData({
          images: that.data.images,
        })
      },
    })
  },
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;

    wx.previewImage({
      //当前显示图片
      current: this.data.images[index],
      //所有图片
      urls: this.data.images
    })
  },
  removeImg: function (event) {
    var position = event.currentTarget.dataset.index;
    this.data.images.splice(position, 1);
    // 渲染图片
    this.setData({
      images: this.data.images,
    })
  },
  handleTitleInput: function (event) {
    this.data.content = event.detail.value;
  },
  handleContentInput: function (event) {
    this.data.content1 = event.detail.value;
  },

  saveToHistoryServer: function (event) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('post').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: that.data.content,
        content1: that.data.content1,
        date: new Date(),
        images: that.data.images,
        user: that.data.user,
        isLike: that.data.isLike,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
    }),
    wx.redirectTo({
      url: '../jiyou1.2/jiyou1.2',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})