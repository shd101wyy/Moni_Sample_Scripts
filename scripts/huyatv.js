
  {
    target_url: /(http|https)\:\/\/www\.huya\.com\/(.+)(\/*)/,
    name: "虎牙tv 主播在线状态跟踪",
    description: "虎牙tv 主播在线状态跟踪",
    keywords: ["huya", "tv", "虎牙"],
    link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      event.$get({url: event.url}, (error, body)=> {
      	if (error) return event.return(false)
        const title = body.match(/\"roomTitle\"\s\:\s\"(.+)\"(\,*)/)[1],
              cover = body.match(/\"avatarImg\"\s\:\s\"(.+)\"(\,*)/)[1],
              online = body.match(/\"isNotLive\"\s\:\s\"\"\,/) ? true : false

        event.return({
          title: title,
          description: (online ? '直播中' : '不在直播'),
          link: event.url,
          media: {cover}
        })
      })
    }
  }
