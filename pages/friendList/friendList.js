// pages/friendList/friendList.js
import { queryFriendListVOUrl, addFriendListUrl, incrContactUrl} from '../../utils/api.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    friendVOList: [
      {
        "friendName": "chris",
        "contactCount": 11
      }
    ],
    newFriendListStr: ""
  },
  refreshPage(cb) {
    var that = this;
    wx.request({
      url: queryFriendListVOUrl(
          {openId: wx.getStorageSync('openId')}
      ),
      success(res) {
        that.setData({
          friendVOList: res.data
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  addFriendListStr(e) {
    var that = this;
    // console.log(that.data.newFriendListStr);
    wx.request({
      url: addFriendListUrl(
          {
            openId: wx.getStorageSync('openId'),
            friendNamesStr: that.data.newFriendListStr
          }
      ),
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openId: wx.getStorageSync('openId'),
        friendNamesStr: that.data.newFriendListStr
      },
      success: function(res) {
        // 刷新列表
        console.log(res.data)
        that.refreshPage();
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  handleInputChange(e) {
    var that = this;
    that.setData({
      newFriendListStr: e.detail.value
    })
  },
  // incr contact
  incrContact(e) {
    var that = this;
    wx.request({
      url: incrContactUrl(
          {
            openId: wx.getStorageSync('openId'),
            friendName: e.target.id
          }
      ),
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openId: wx.getStorageSync('openId'),
        friendName: e.target.id
      },
      success: function(res) {
        // 刷新列表
        console.log(res.data)
        that.refreshPage();
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    this.refreshPage(() => (console.log()));
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