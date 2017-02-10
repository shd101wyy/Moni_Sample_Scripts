
  {
    target_url: /^(http|https)\:\/\/www\.fixsub\.com\/portfolio\/([^\/]+)/,
    name: "fix字幕侠",
    description: "fix字幕侠视频订阅",
    keywords: ["fix", "fixsub"],
	  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      event.$get(event.url, function(error, body) {
        if (error) return false
        const $ = event.cheerio.load(body, {decodeEntities: false})
        const title = $('.content-page-title').text()
        const cover = $('.lightbox-image .img-frame').attr('src')
        const contentBox = $('.content-box')
        const list = $('div', contentBox)
        const temp = $('div', list)
        const last = $(temp[temp.length - 2])
        const description = last.html().replace(/\<a\s+\href\=\"([^\"]+)\"([^\>]+)\>([^\<]+)\<\/a\>/g, function(whole, url, t, name) {
        	return `[${name}](${url})`
        })

        event.return({
          title,
          description,
          link: event.url,
          // favicon: "(optional) favicon? eg: https://github.com/favicon.ico",
          media: {cover}
        })
      })
    }
  }
