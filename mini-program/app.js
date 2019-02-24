App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    console.log('App Launch')
    var date = new Date();
    var t = date.toTimeString();
    console.log("The moment time is:" + t)
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log('App Show')
    wx.openBluetoothAdapter({
      success: function(res) {
        if (res.errMsg == "openBluetoothAdapter:ok")
          console.log("Bluetooth opend successfully.")
        wx.startBluetoothDevicesDiscovery({
          services: [],
          success(res) {
            console.log(res)
          }
        })
      },
      fail:function(res){
        wx.showToast({
          title: '请打开蓝牙开关以连接设备',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('App Hide')
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
