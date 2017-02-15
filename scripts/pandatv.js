{
  target_url: /^(http|https)\:\/\/www\.panda\.tv\/(\d+)/,
  name: "panda tv 主播在线提醒",
  description: "panda tv 主播在线提醒",
  keywords: [
    "panda", "tv"
  ],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.1",
  public: true, // set to true if you want to publish this script so others can find it
  script: function(event) { // event = {url, cheerio, $get}
    const roomId = event.url.match(/^(http|https)\:\/\/www\.panda\.tv\/(\d+)/)[1]
    event.$get({
      url: `http://www.panda.tv/api_room_v2?roomid=${roomId}`,
      dataType: 'json'
    }, (error, json) => {
      if (error || !json)
        return event.return (false)
      if (json.errno !== 0)
        return event.return (false)
      const videoInfo = json.videoinfo,
            status = videoinfo.status
      const hostInfo = json.hostinfo,
            cover = hostInfo.avatar,
            name = hostInfo.name
      const title = `${name} panda.tv`
      const online = (status != '3')
      return event.return ({
        title,
        description: (online ? '直播中' : '不在直播'),
        link: event.url,
        media: {
          cover
        },
        notificationOff: (online ? false : true),
      })
    })
  }
}