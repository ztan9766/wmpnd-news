Component({
  properties: {
    logo: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '新闻小程序'
    },
    showBack: {
      type: Boolean,
      value: false
    }
  },
  data: {
    titleHeight: '',
    bg: "#990033",
    color: "#fff"
  },
  ready: function() {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          titleHeight: res.statusBarHeight + 46
        });

      }
    })
  },
  methods: {
    back: function() {
      wx.navigateBack();
    }
  }
})