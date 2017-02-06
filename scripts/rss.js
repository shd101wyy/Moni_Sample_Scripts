
{
  target_url: /^(http|https)\:\/\//,
  name: "rss subscriber",
  description: "subscribe",
  keywords: ["rss"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts",
  version: "0.0.2",
  public: true,
  script: function (event) { // event = {url, cheerio, $get}
      event.$get({url: event.url, dataType: 'text'}, (error, body)=> {
        if (error) return event.return(false)
        if (body.indexOf('<rss') < 0) return event.return(false)
        let i = body.indexOf('<title>'),
              j = body.indexOf('</title>')
        const title = body.slice(i + 7, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)

        i = body.indexOf('<title>', j + 8)
        j = body.indexOf('</title>', i)
        let newestFeedTitle = ('newest: ' + body.slice(i + ('<title>').length, j)) || ''
		newestFeedTitle = newestFeedTitle.replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)


        i = body.indexOf('<description>')
        j = body.indexOf('</description>')
        const description = body.slice(i + ('<description>').length, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a) || ''

        i = body.indexOf('<pubDate>')
        j = body.indexOf('</pubDate>')
        const newestPubdate = body.slice(i + ('<pubDate>').length, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)
        const feedNum = body.match(/\<item\>/g).length

		const urlMatch = event.url.match(/^(http|https)\:\/\/([^\/]+)/)
		let favicon = null
        if (urlMatch) {
        	favicon = 'chrome://favicon/' + urlMatch[1] + '://' + urlMatch[2]
        }

        event.return({
          title,
          description: `${description}
${feedNum} rss feeds
${newestFeedTitle}
${newestPubdate}`,
          link: 'http://rss/', // this means this is rss.
          favicon
        })
      })
    }
}
