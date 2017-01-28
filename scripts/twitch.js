
{
  target_url:/^(https|http)\:\/\/www\.twitch\.tv\/(.+)$/,
  name: "twitch live status check",
  description: "check twitch user/channel live status",
  keywords: ["twitch"],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.1",
  public: false, // set to true if you want to publish this script so others can find it
  script: function(event) { // event = {body, url, cheerio, $get}
    event.$get(event.url, (error, body)=> {
      if (error) return event.return(false)
      const $ = event.cheerio.load(body)
      const title = $('meta[property="og:title"]').attr('content'),
            cover = $('meta[property="og:image"]').attr('content'),
            username = title.split(' ')[0]
      // http://streambadge.com/twitch/?username=sing_sing
      event.$get({
        url: `https://api.twitch.tv/kraken/streams/${username}?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm`,
        dataType: 'json',
      }, function(error, json) {
        if (error) {
          event.return(false) // error
        } else {
          event.return({
            title: title,
            description: json.stream ? 'live' : 'offline',
            link: event.url,
            media: {cover}
          })
        }
      })
    })
  }
}
