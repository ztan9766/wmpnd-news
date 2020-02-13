//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    logo: '../../assets/images/logo.jpeg',
    selected: '',
    newsList: [],
    // 定义新闻类型
    categories: [{
        key: 'gn',
        name: '国内'
      }, {
        key: 'gj',
        name: '国际'
      }, {
        key: 'cj',
        name: '财经'
      }, {
        key: 'yl',
        name: '娱乐'
      }, {
        key: 'js',
        name: '军事'
      }, {
        key: 'ty',
        name: '体育'
      },
      {
        key: 'other',
        name: '其他'
      }
    ]
  },
  //事件处理函数
  formateDate: function(date) {
    return util.formateTime(date)
  },
  onLoad: function () {
    this.initPageData()
  },
  onPullDownRefresh: function() {
    this.initPageData()
  },
  initPageData:function () {
    // 初始化页面数据
    const current = this.data.categories[0].key
    this.setData({ selected: current })
    this.loadData(current)
  },
  loadData: function(type) {
    // 加载新闻列表
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type
      },
      success: res => {
        if(res.data.code === 200) {
          const newsList = res.data.result
          // 格式化时间
          newsList.map(e => {
            e.formatedDate = util.formatTime(new Date(e.date))
          })
          this.setData({ newsList: newsList, selected: type})
        }
      }
    })
  },
  goDetail: function(e) {
    // 跳转到新闻详情页
    const id = e.currentTarget.dataset.id || ''
    if(id !== '') {
      wx.navigateTo({
        url: '../detail/detail?newsId=' + id
      })
    }
  },
  changeNewsType: function (e) {
    // 切换新闻类型，在切换后请求新的新闻列表
    const type = e.currentTarget.dataset.key || ''
    if(type !== '' && type !== this.data.selected) {
      this.loadData(type)
    }
  }
})