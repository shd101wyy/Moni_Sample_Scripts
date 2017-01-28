
{
  target_url: /^http\:\/\/(m|www)\.biquge\.(tw|com)\/([\d_]+)(\/*)/,
  name: "笔趣阁小说更新追踪",
  description: "用于追踪小说的更新",
  keywords: ["小说", "笔趣阁"],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio}
    const match = event.url.match(/^http\:\/\/(m|www)\.biquge\.(tw|com)\/([\d_]+)(\/*)/),
          bookId = match[3],
          www = match[1],
          com = match[2]

    const targetUrl = `http://m.biquge.${com}/${bookId}/`
    event.$get(targetUrl, (error, body)=> {
      if (error) return event.return(false)
      const $ = event.cheerio.load(body)
      if (com === 'com') {
        const title = $('.block_txt2 h2').text() + ' （笔趣阁）'
        const data = $('.block_txt2').text()
        const author = $($('.block_txt2 p')[1]).text(),
              updated = $($('.block_txt2 p')[4]).text(),
              newest = $($('.block_txt2 p')[5]).text()
        event.return({
          title,
          description: `${author}
${newest}
${updated}`,
          link: targetUrl,
          favicon: `http://m.biquge.tw/favicon.ico`
        })
      } else { // tw
        const title = $('.title').text() + ' （笔趣阁）'
        const data = $('.synopsisArea_detail').text().split('\n').filter((x)=>x.trim().length).map((x)=>x.trim())
        const author = data[0].match(/\《(.+?)\》/)[1]
        const description = data[0] + '\n' + data[4] + '\n' + data[3]
        event.return({
          title,
          description,
          link: targetUrl,
        })
      }
    })
  }
}
