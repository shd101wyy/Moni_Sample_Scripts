
  {
    target_url: /^(http|https)\:\/\/dotamax\.com\/player\/detail\/(\d+)(\/*)$/,
    name: "Dotamax player latest match",
    description: "track player's latest match",
    keywords: ["dota", "dota2", "dotamax"],
    link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {body, url, cheerio, $get}
      const id = event.url.match(/^(http|https)\:\/\/dotamax\.com\/player\/detail\/(\d+)(\/*)$/)[2]
      event.$get(`http://dotamax.com/player/detail/${id}/`, (error, body)=> {
        if (error) return event.return(false)
        const $ = event.cheerio.load(body)
        const title = $('title').text().split('-')[0] + ' - Dotamax'
        const flatGrayBox = $($('.flat-grey-box')[1])
        const latestMatch = $($('tr', flatGrayBox)[0])
        const cover = $('.hero-img-list', latestMatch).attr('src')
        const matchId = $($('td', latestMatch)[1]).text().trim().replace(/\n/g, '')
        const timeFinished = $($('.fromnow', latestMatch)[0]).text()
      const result = $($('td', latestMatch)[3]).text()
        const kda = $($('td', latestMatch)[4]).text().trim()
        const level = $($('td', latestMatch)[5]).text()
        const favicon = $('.circle-img img').attr('src')

        event.return({
          title: title,
          description: `${matchId}
  ${result}: ${timeFinished}
  KDA  : ${kda}
  Level: ${level}`,
          link: event.url,
          favicon,
          media: {cover}
        })
      })
    }
  }
