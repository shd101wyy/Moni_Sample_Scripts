
  {
    target_url: /^(http|https)\:\/\/(book|m)\.qidian\.com\/(info|book)\/(\d+)/,
    name: "起点 小说更新",
    description: "起点网小说更新追踪",
    keywords: ["qidian", "起点"],
	link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      const id = event.url.match(/(info|book)\/(\d+)/)[2]
      const http = event.url.match(/^(http|https)\:/)[1]
      const url = `http://m.qidian.com/book/${id}`
	  event.$get({url, dataType: 'text'}, (error, body)=> {
		const $ = event.cheerio.load(body)
        const title = $('.header-back-title').text() + ' 起点网'
        const info = $('.book-meta-r').text()
        const updateTime = info.split('·')[0].trim(),
              newestChapter = info.split('·')[1].trim()
        const cover = http + ':' + $('.book-detail-info .book-layout img').attr('src')
        return event.return({
          title: title,
          description: `${newestChapter}
${updateTime}`,
          media: {cover},
          link: url
        })
      })
    }
  }
  