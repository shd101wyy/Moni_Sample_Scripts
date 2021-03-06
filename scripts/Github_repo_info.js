
{
  target_url: /^https\:\/\/github.com\/(.)+?\/(.)+?/,
  name: "Github Repository Info",
  description: "used to track github repository info",
  keywords: ["github"],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.1",
  public: true,
  script: function (event) { // you can use: body, cheerio, JSON, Math, String
    event.$get(event.url, (error, body)=> {
      if (error) return event.return(false)
      const $ = event.cheerio.load(body)
      let title = $('title').text()
      const i = title.indexOf(':')
      const description = title.slice(i+1, title.length).trim() + '\n\n' +
                    $($('.social-count')[0]).text().trim() + ' watchers\n' +
                    $($('.social-count')[1]).text().trim() + ' stars; ' + $($('.social-count')[3]).text().trim() + ' forks\n' +
                    $($('.counter')[0]).text().trim() + ' issues; ' + $($('.counter')[1]).text().trim() + ' pull requests\n'

      title = title.slice(0, i).trim()
      const j = title.indexOf('/'),
            k = title.indexOf('-')
      const projectName = title.slice(j+1, title.length),
            authorName = title.slice(k+1, j).trim()

      event.return({
        title: title,
        description,
        link: event.url,
        favicon: "https://github.com/favicon.ico",
      })
    })
  }
}
