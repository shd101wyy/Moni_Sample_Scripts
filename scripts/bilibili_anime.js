{
  target_url: /bangumi\.bilibili\.com\/anime\/(\d+)/,
  name: "bilibili 番剧订阅",
  description: "bilibili 番剧订阅",
  keywords: ["bilibili", "bangumi"],
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio}
      const $ = event.cheerio.load(event.body)
      const seasonId = event.url.match(/bangumi\.bilibili\.com\/anime\/(\d+)/)[1]
      event.$get({url: `http://bangumi.bilibili.com/jsonp/seasoninfo/${seasonId}.ver`, dataType: 'text'}, (error, text)=> {
        if (error) {
          return event.return(false)
        }
        text = text.replace(/^seasonListCallback\((.+)\)\;$/, (x, a)=>a)
        const json = JSON.parse(text)
        const result = json.result
        const bangumiTitle = result.bangumi_title,
              seasonTitle = result.season_title
       	const newestEpisode = result.episodes[0],
              av_id = newestEpisode.av_id,
              cover = newestEpisode.cover,
              url = newestEpisode.webplay_url,
              updateTime = (new Date(newestEpisode.update_time)),
              episodeTitle = '第' + newestEpisode.index + '话 ' + newestEpisode.index_title

        const title = bangumiTitle + ' ' + seasonTitle
        const description = `[${episodeTitle}](${url})`
        event.return({
          title,
          description,
          link: `http://bangumi.bilibili.com/anime/${seasonId}`,
          favicon: `http://www.bilibili.com/favicon.ico`,
          media: {cover: cover}
      	})
      })
    }
}
