
  {
    target_url: /(http|https)\:\/\/www\.huomao\.com\/(.+)(\/*)/,
    name: "火猫tv 主播在线跟踪",
    description: "火猫tv 主播在线跟踪",
    keywords: ["huomao", "火猫", "tv"],
    link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      event.$get({url: event.url}, (error, body)=> {
      	if (error) return event.return(false)
        const title = body.match(/\.nickname\s\=\s\"(.+)\"\;/)[1],
              cover = body.match(/\.headimg\.big\s\=\s\"(.+)\"\;/)[1],
              online = body.match(/\.is_live\s\=\s\"(.+)\"\;/)[1] == '1'

            event.return({
        title: title,
        description: (online ? '直播中': '不在直播'),
        link: event.url,
        // favicon: "(optional) favicon? eg: https://github.com/favicon.ico",
        media: {cover},
        notificationOff: (online ? false : true),
      })
     })
    }
  }
