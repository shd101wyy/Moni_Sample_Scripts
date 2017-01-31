
{
  target_url: /^(https|http)\:\/\/twitter\.com\/([^\/]+)$/,
  name: "twitter finance tweet tracker",
  description: "track user tweet that has $ content",
  keywords: ["twitter", "finance"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts",
  version: "0.0.2",
  public: true,
  script: function (event) { // event = {body, url, cheerio}
    event.$get(event.url, (error, body)=> {
      if (error) return event.return(false)
      // eg: https://twitter.com/realDonaldTrump
      const $ = event.cheerio.load(body)
      const title = '$ ' + $('title').text().trim().replace(/\| Twitter$/, '')
      const atName = title.match(/\(\@(.+)\)/)[1]
      const cover = `https://twitter.com/${atName}/profile_image?size=bigger`

      const tweets = $('.js-tweet-text-container')
      let description = null
      let link = `https://twitter.com/${atName}`
      for (let i = 0; i < tweets.length; i++) {
        const tweet = $(tweets[i]).text()
        if ($(tweets[i]).html().indexOf('<s>$</s>') >= 0) {
          description = tweet
          link = 'https://twitter.com' + $($('.tweet')[i]).attr('data-permalink-path')
          break;
        }
      }

      if (!description) {
        return event.return({
          title,
          description: "this user has no financial related tweet",
          link: link,
          favicon: `https://twitter.com/favicon.ico`,
          media: {cover},
          notificationOff: true,
        })
      } else {
        event.return({
          title,
          description,
          link: link,
          favicon: `https://twitter.com/favicon.ico`,
          media: {cover}
        })
      }
    })
  }
}
