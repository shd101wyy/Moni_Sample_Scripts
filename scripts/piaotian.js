
  {
    target_url: /^(http|https)\:\/\/(m|www)\.piaotian\.com\/(?:html|bookinfo|book)\/\d+\/\d+/,
    name: "飘天文学更新订阅",
    description: "票天文学更新订阅",
    keywords: ["piaotian", "飘天"],
    link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: '0.0.1',
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      const m = event.url.match(/^(http|https)\:\/\/(m|www)\.piaotian\.com\/(?:html|bookinfo)\/\d+\/(\d+)/)
      const bookId = m[3]
      event.$get({url: `http://m.piaotian.com/book/${bookId}.html`}, (error, body)=> {
      	if (error) return event.return(false)
        const $ = event.cheerio.load(body)
        const bookName = $('.block h2').text(),
              newestChapterName = $($('.block p')[5]).text(),
              urlAttr = $($('.block p a')[3]).attr('href'),
              newestChapterUrl = `http://m.piaotian.com${urlAttr}`,
              author = $($('.block p')[1]).text(),
              updateTime = $($('.block p')[4]).text(),
              cover = $('.block_img2 img').attr('src'),
              bookUrl = `http://m.piaotian.com/book/${bookId}.html`
        event.return({
          title: `${bookName}（飘天文学）`,
          description: `${author}
${newestChapterName}
${updateTime}`,
          link: bookUrl,
          media: {cover}
        })
      })
    }
  }
