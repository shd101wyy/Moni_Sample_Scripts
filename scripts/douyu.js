
  {
    target_url: /^(https|http)\:\/\/www\.douyu\.com\/(.+)(\/*)$/,
    name: "斗鱼直播在线提醒",
    description: "提醒主播在线状态",
    keywords: ["douyu", "live"],
    version: "0.0.1",
    public: false, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {body, url, cheerio, $get}
      const $ = event.cheerio.load(event.body)
	  let live = true
      if (event.body.indexOf('上次直播') >= 0) {
      	live = false
      }
      const title = $('title').text().replace(' - 每个人的直播平台', '')
      const cover = $('#anchor-info .fl img').attr('src')
      event.return({
        title,
        description: (live? '直播中':'不在直播'),
        link: event.url,
        media: {cover}
      })
    }
  }
  