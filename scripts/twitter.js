
{
  target_url: /^(https|http)\:\/\/twitter\.com\/([^\/]+)$/,
  name: "twitter update tracker",
  description: "track user twitter update. Display the most recent post.",
  keywords: ["twitter"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts",
  version: "0.0.1",
  public: true,
  script: function (event) { // event = {body, url, cheerio}
    event.$get(event.url, (error, body)=> {
      if (error) return event.return(false)
      // eg: https://twitter.com/realDonaldTrump
      const $ = event.cheerio.load(body)
      const title = $('title').text().trim().replace(/\| Twitter$/, '')
      const description = $($('.js-tweet-text-container')[0]).text()
      const link = `https://twitter.com` + $($('.tweet')[0]).attr('data-permalink-path')
      const atName = title.match(/\(\@(.+)\)/)[1]
      const cover = `https://twitter.com/${atName}/profile_image?size=bigger`
      event.return({
        title: title,
        description,
        link: link, // `https://twitter.com/${atName}`,
        favicon: `https://twitter.com/favicon.ico`,
        media: {cover}
      })
    })
  }
}
