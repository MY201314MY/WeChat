// page/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:"iPhone",
    input:"ON"
  },
  post: function(){
    console.log(this.input)
    this.msg = {'id': 'LED', 'status': this.data.input}
    this.publish(this.data.topic, this.msg)
    wx.showToast({
      title: 'Pub success',
      icon: 'success',
      duration: 500
    })
  },
  bindKeyInput: function (e) {
    this.data.input=e.detail.value
  },
  direction: function (button) {
    var that = this
    var id = button.target.id
    console.log("The key you have pressed is:" + id)
    if(id=="plus"){
      this.msg = { 'id': 'remote', 'status': id }
    } else if(id=="subtract"){
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "up") {
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "left") {
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "ok") {
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "right") {
      this.msg = { 'id': 'remote', 'status': id }
    }else if (id == "down") {
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "menu") {
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "back") {
      this.msg = { 'id': 'remote', 'status': id }
    } else if (id == "signal") {
      this.msg = { 'id': 'remote', 'status': id }
    } else{
      this.msg = { 'id': 'remote', 'status': "null" }
    }
    this.publish(this.data.topic, this.msg)
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
    const ctx = wx.createCanvasContext('m')
    ctx.setFillStyle('violet')
    ctx.fillRect(10, 10, 100, 100)
    
    ctx.draw()
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

  },
  publish: function (topic, message) {
    console.log(message)
    wx.request({
      url: 'https://api.heclouds.com/mqtt?topic=' + topic,
      method: 'POST',
      data: {
        message
      },
      header: {
        'content-type': 'application/json',
        'api-key': 'r6VsaTGQVMeYmOujP4xkHFVCXvo='
      },
      success(res) {
        console.log('----Success to request----')
        console.log(res.data)
        console.log(res.statusCode)
      },
      fail(res) {
        console.log('----Failed to request----')
      }
    })
  }
})