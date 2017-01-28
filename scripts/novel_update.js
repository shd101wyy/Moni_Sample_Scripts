
{
  target_url: /http\:\/\/m\.biquge\.tw\/(.)+?/,
  name: "笔趣阁小说更新追踪",
  description: "用于追踪小说的更新",
  keywords: ["小说", "笔趣阁"],
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio}
      const $ = event.cheerio.load(event.body)
      const title = $('.title').text() + ' （笔趣阁）'
      const data = $('.synopsisArea_detail').text().split('\n').filter((x)=>x.trim().length).map((x)=>x.trim())
      const author = data[0].match(/\《(.+?)\》/)[1]
      const bookTitle = $('.title').text()
      const description = data[0] + '\n' + data[4] + '\n' + data[3]
      const cover = $($('.synopsisArea_detail img')[0]).attr('src')
      event.return({
        title,
        description,
        link: "http://m.biquge.tw/1_1287",
        keywords: ["笔趣阁", author, bookTitle],
		// media: {cover}
      })
    }
}
