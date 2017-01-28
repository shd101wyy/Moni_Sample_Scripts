
{
  target_url: /http\:\/\/([^\.]+)\.tumblr\.com/,
  name: "tumblr update tracker",
  description: "track tumblr update",
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  keywords: ["tumblr"],
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio, $get}
    const id = event.url.match(/http\:\/\/([^\.]+)\.tumblr\.com/)[1]
    event.$get(`http://${id}.tumblr.com`, (error, body)=> {
      if (error) return event.return(false)
      const $ = event.cheerio.load(body)
      const title = $($('title')[0]).text().trim()
      const post = $($('.post')[0])
      const cover = $('img', post).attr('src'),
            postUrl = $('a', post).attr('href')
      const description = $('.post-caption h2', post).text() || 'tumblr post'
      event.return({
        title,
        description: `[${description}](${postUrl})`,
        link: event.url,
        media: {cover}
      })
    })
  }
}
