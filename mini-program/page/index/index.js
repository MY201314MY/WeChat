Page({
  /**
   * 页面的初始数据
   */
  data: {
    src:'m.PNG',
    temperature:0,
    humidty:0,
    light:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ speed: 0 })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.request()
    this.interval = setInterval(this.request, 60000)
    wx.showToast({
      title: '设备检索中',
      icon: 'loading',
      duration: 5000
    })
    
  },
  search:function(){
    wx.getBluetoothDevices({
      success(res) {
        console.log(res)
      }
    })
    clearInterval(this.blue)
  },
  request: function () {
    var that=this
    wx.request({
      url: 'https://api.heclouds.com/devices/505695046/datapoints',
      method: 'GET',
      date: {
      },
      header: {
        'content-type': 'application/json',
        'api-key': 'r6VsaTGQVMeYmOujP4xkHFVCXvo='
      },
      success(res) {
        for (var i = 0; i < res.data.data.count; i++) {
          if (res.data.data.datastreams[i].id == 'temperature') {
            var temp = res.data.data.datastreams[i].datapoints[0].value
            that.setData({ temperature: temp })
            console.log("The temperature is:" + temp)
          }
          else if (res.data.data.datastreams[i].id == 'humidty') {
            var humi = res.data.data.datastreams[i].datapoints[0].value
            that.setData({ humidty: humi })
            console.log("The humidty is:" + humi)
          }
          else if (res.data.data.datastreams[i].id == 'LED') {
            var LED = res.data.data.datastreams[i].datapoints[0].value
            that.setData({ light: LED==1?true:false })
          }
          else {
          }
        }
      },
      fail(res) {
        console.log('----Failed to request----')
      }
    })
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
    clearInterval(this.interval)
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
  
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  },
  moment: function () {
    var date = new Date();
    var t = date.toLocaleTimeString();
    console.log("The moment time is:" + t)
  },
  switchChange: function (e) {
    console.log("switch 发生 change event, the id is:" + e.target.id)
    console.log("switch 发生 change event, the value is:" + e.detail.value)
  },
  topic: function(){
    console.log("Sendin request to get topics...")
    wx.request({
      url: 'https://api.heclouds.com/mqtt/topic',
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json',
        'api-key': 'r6VsaTGQVMeYmOujP4xkHFVCXvo='
      },
      success(res) {
        console.log('----Success to request----')
        console.log("There are " + res.data.data.length + " topics totally.")
        for (var i = 0; i < res.data.data.length; i++){
          console.log("The " + (i+1) + " topic is "+res.data.data[i])
        }
      },
      fail(res) {
        console.log('----Failed to request----')
      }
    })
  },
  publish: function (topic,message) {
    console.log(message)
    wx.request({
      url: 'https://api.heclouds.com/mqtt?topic='+topic,
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
        console.log(res.header)
        console.log(res.data)
        console.log(res.statusCode)
        
        if(res.data.errno==0){
          console.log("Exec successfully.")
        }
        else{
          if (res.data.error =="invalid parameter: no device subscribe to this topic"){
            console.log("device outline")
            wx.showToast({
              title: 'Outline',
              icon: 'none',
              duration: 2000
            })
          }
        }
      },
      fail(res) {
        console.log('----Failed to request----')
      }
    })
  },
  LED: function(e){
    this.msg = { 
      'id': 'LED', 
      'status': e.detail.value == true ? "ON" : "OFF"
      }
    this.publish("iPhone", this.msg)
  },
  gate: function (e) {
    this.msg = {
      'id': 'slider',
      'grade': e.detail.value == true ? "ON" : "OFF"
    }
    this.publish("raspberrypi", this.msg)
  },
  sliderchange: function(slider){
    this.setData({speed:slider.detail.value})
    this.msg={
      'id': 'slider', 
      'grade': slider.detail.value
    }
    this.publish("raspberrypi", this.msg)
  },
  click: function (button) {
    var that=this
    var id = button.target.id
    console.log("The lamp you have turn is:" + id + ",thanks")
    wx.request({
      url: 'https://api.heclouds.com/devices/47975479/datapoints',
      method: 'GET',
      date:{
      
      },
      header: {
        'content-type': 'application/json',// 默认值
        'api-key':'r6VsaTGQVMeYmOujP4xkHFVCXvo='
      },
      success(res) {
        console.log('----success----')
        console.log('******** date ********')
        console.log(res.data)
        console.log('******** stattus ********')
        console.log(res.statusCode)
        console.log(JSON.stringify(res.data))

        console.log("The type is: " + typeof (res.data.data))
        console.log(res.data)

        console.log("And what you want?")
        console.log(res.data.data.count)
        console.log(res.data.data.datastreams[0].id)
        console.log(res.data.data.datastreams[0].datapoints[0].at)
        console.log(res.data.data.datastreams[0].datapoints[0].value)
        var templete
        for (var i = 0; i < res.data.data.count; i++){
          console.log("The id is:"+res.data.data.datastreams[i].id)
          if (res.data.data.datastreams[i].id == 'temperature'){
            console.log("Temp received")
            var temp
            temp = res.data.data.datastreams[i].datapoints[0].value
            that.setData({ temperature: temp })
            console.log("The temperature is:" + temp)
          }
          
          else if(res.data.data.datastreams[i].id == 'humidty') {
            console.log("Humidty received")
            var humi
            humi = res.data.data.datastreams[i].datapoints[0].value
            that.setData({ humidty: humi })
            console.log("The humidty is:" + humi)
          }
          else{

          }
        }
      },
      fail(res) {
        console.log('----Failed to request----')
      }
    })
  },
  raspberrypi:function(){
    wx.request({
      url: 'https://api.heclouds.com/devices/47975479/datapoints',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'api-key': 'r6VsaTGQVMeYmOujP4xkHFVCXvo='
      },
      data:{
        'datastreams': [
          { "id": "humidty", "datapoints": [{ "value": 36 }] },
          { "id": "temperature", "datapoints": [{ "value": 12 }] }
          ]
      },
      success(res) {
        console.log('----Success to request----')
        console.log(res.header)
        console.log(res.data)
        console.log(res.statusCode)
      },
      fail(res) {
        console.log('----Failed to request----')
      }
    })
  }
})

