{
  target_url: /(https|https)\:\/\/www\.zhanqi\.tv\/(.+)(\/*)/,
  name: "战旗tv 主播在线状态跟踪",
  description: "战旗tv 主播在线状态跟踪",
  keywords: ["zhanqi", "战旗tv", "战旗"],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.2",
  public: true, // set to true if you want to publish this script so others can find it
  script: function(event) { // event = {url, cheerio, $get}
    event.$get({url: event.url, dataType: 'text'}, (error, body)=> {
      if (error) return event.return(false)
      const m = body.match(/window\.oPageConfig\.oRoom\s\=\s(.+)\;/)[1]
      const json = JSON.parse(m)
      const title = json.title,
            online = json.online != '0',
            // https://img2.zhanqi.tv/avatar/7c/f64/2456_1482021967.jpg-medium
            cover = json.avatar + '-medium'
      event.return({
        title: title,
      	description: (online ? '直播中' : '不在直播'),
        link: event.url,
       	media: {cover},
        notificationOff: (online ? false : true),
      })
    })
  }
}
