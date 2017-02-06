
  {
    target_url: /(http|https)\:\/\/www\.youtube\.com\/user\/([^\/]+)/,
    name: "youtube subscription",
    description: "subscribe youtube user videos",
    keywords: ["youtube"],
    // link: "(optional) link to your script introduction page",
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      const user = event.url.match(/(http|https)\:\/\/www\.youtube\.com\/user\/([^\/]+)/)[2]
      event.$get(`https://www.youtube.com/user/${user}/videos`, (error, body)=> {
		const $ = event.cheerio.load(body)
        const title = $('title').text()
        const link = `https://www.youtube.com/user/${user}`
        const latestVideoTitle = $($('.yt-lockup-title a')[0]).attr('title')
        const videoLink = `https://www.youtube.com${$($('.yt-lockup-title a')[0]).attr('href')}`
        const cover = $($('.channels-content-item .video-thumb .yt-thumb-clip img')[0]).attr('src')
        if (error) event.return(false)
        event.return({
          title,
          description: `[${latestVideoTitle}](${videoLink})`,
          link,
          media: {cover}
        })
      })
    }
  }
  