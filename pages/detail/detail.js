//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    id: '',
    news: {}
  },
  onLoad: function (options) {
    this.loadData(options.newsId)
    this.setData({id: options.newsId})
  },
  onPullDownRefresh: function () {
    this.loadData(this.data.id)
  },
  loadData(id) {
    // 请求文章详情
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id
      },
      success: res => {
        if (res.data.code === 200) {
          const news = res.data.result
          // 格式化时间
          news.formatedDate = util.formatTime(new Date(news.date))
          this.setData({news})
        }
      }
    })
  }
})
