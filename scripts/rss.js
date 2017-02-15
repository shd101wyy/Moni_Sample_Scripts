
{
  target_url: "*",
  name: "rss(atom) subscriber",
  description: "subscribe",
  keywords: ["rss", "atom"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts",
  version: "0.0.4",
  public: true,
  script: function (event) { // event = {url, cheerio, $get}
      event.$get({url: event.url, dataType: 'text'}, (error, body)=> {
        if (error) return event.return(false)
        const indexOfRss = body.indexOf('<rss'),
              indexOfAtom = body.indexOf('<feed')
        if (indexOfRss < 0 && indexOfAtom < 0) return event.return(false)
        if (indexOfRss >= 0) { // rss
          let i = body.indexOf('<title>'),
                j = body.indexOf('</title>')
          const title = body.slice(i + 7, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)

          i = body.indexOf('<title>', j + 8)
          j = body.indexOf('</title>', i)
          let newestFeedTitle = ('newest: ' + body.slice(i + ('<title>').length, j)) || ''
          newestFeedTitle = newestFeedTitle.replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)


          i = body.indexOf('<description>')
          j = body.indexOf('</description>')
          let description = ''
          if (i>=0)
	         description = body.slice(i + ('<description>').length, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a) || ''

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
  ${feedNum} feeds
  ${newestFeedTitle}
  ${newestPubdate}`,
            link: 'http://rss/', // this means this is rss.
            favicon
          })
        } else { // atom
          let i = body.indexOf('<title>'),
              j = body.indexOf('</title>')
          const title = body.slice(i + 7, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)

          i = body.indexOf('<title', j + 8)
          j = body.indexOf('</title>', i)
          let newestFeedTitle = ('newest: ' + body.slice(i, j).match(/\<title([^\>]*)\>(.+)$/)[2]) || ''
          newestFeedTitle = newestFeedTitle.replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)


          i = body.indexOf('<description>')
          j = body.indexOf('</description>')
          let description = ''
          if (i>=0)
           description = body.slice(i + ('<description>').length, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a) || ''


          i = body.indexOf('<published>')
          j = body.indexOf('</published>')
          const newestPubdate = body.slice(i + ('<pubDate>').length, j).replace(/\<\!\[CDATA\[(.+)\]\]\>/, (x, a)=> a)
          const feedNum = body.match(/\<entry\>/g).length

          const urlMatch = event.url.match(/^(http|https)\:\/\/([^\/]+)/)
          let favicon = null
          if (urlMatch) {
              favicon = 'chrome://favicon/' + urlMatch[1] + '://' + urlMatch[2]
          }

          event.return({
            title,
            description: `${description}
  ${feedNum} feeds
  ${newestFeedTitle}
  ${newestPubdate}`,
            link: 'http://rss/', // this means this is rss.
            favicon
          })
        }
      })
    }
}
