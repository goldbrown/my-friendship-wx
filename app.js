//app.js
import { loginUrl} from './utils/api.js';

App({
  onLaunch: function () {
    if (wx.getStorageSync('openId')) {
      console.log("stored openId:" + wx.getStorageSync('openId'))
      return;
    }
    this.loginCallback();
  },
  loginCallback(cb) {
    // console.log("cb is " + cb);
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code) {
          wx.request({
            url: loginUrl(),
            data: {
              code: res.code
            },
            success: function(res) {
              // login success
              // console.log('openId:' + res.data);
              if(res.data) {
                wx.setStorageSync('openId', res.data);
                if(cb) {
                  cb();
                }
              } else {
                console.log("登录失败");
              }
            }
          });
        } else {
          console.log("get code error");
        }
        
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });
  }
})