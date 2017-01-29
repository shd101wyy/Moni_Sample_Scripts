
{
  target_url: /(rss|xml|\.rss|\.xml)$/,
  name: "rss subscriber",
  description: "subscribe",
  keywords: ["rss"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts",
  version: "0.0.1",
  public: false,
  script: function (event) { // event = {url, cheerio, $get}
      event.$get({url: event.url, dataType: 'text'}, (error, body)=> {
        if (error) return event.return(false)
        if (body.indexOf('<rss') < 0) return event.return(false)
        let i = body.indexOf('<title>'),
              j = body.indexOf('</title>')
        const title = body.slice(i + 7, j)

        i = body.indexOf('<description>')
        j = body.indexOf('</description>')
        const description = body.slice(i + ('<description>').length, j) || ''

        i = body.indexOf('<pubDate>')
        j = body.indexOf('</pubDate>')
        const newestPubdate = body.slice(i + ('<pubDate>').length, j)
        const feedNum = body.match(/\<item\>/g).length

		const urlMatch = event.url.match(/^(http|https)\:\/\/([^\/]+)/)
		let favicon = null
        if (urlMatch) {
        	favicon = 'chrome://favicon/' + urlMatch[1] + '://' + urlMatch[2]
        }

        event.return({
          title,
          description: `${description}
${feedNum} feeds
${newestPubdate}`,
          link: 'http://rss', // this means this is rss.
          favicon
        })
      })
    }
}
