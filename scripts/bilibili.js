{
  target_url: /^(http|https)\:\/\/((www\.bilibili\.com\/video\/av(\d+))|(space\.bilibili\.com\/(\d+)))|bangumi\.bilibili\.com\/anime\/(\d+)/,
  name: "Bilibili 订阅助手",
  description: "可用于订阅 bilibili 番剧，up主空间视频更新。",
  keywords: [
    "bilibili", "up", "up主"
  ],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.1",
  public: true, // set to true if you want to publish this script so others can find it
  script: function(event) { // event = {url, cheerio, $get}
    const http = event.url.match(/^(http|https)\:\/\//)[1]

    // space
    const spaceMatch = event.url.match(/^(http|https)\:\/\/space\.bilibili\.com\/(\d+)/)
    if (spaceMatch) {
      const id = spaceMatch[2]
      return event.$get({
        url: `http://space.bilibili.com/ajax/member/getSubmitVideos?mid=${id}&pagesize=1`,
        dataType: 'json'
      }, (error, json) => {
        const newestVideoData = json.data.vlist[0]
        const title = newestVideoData.title
        const description = newestVideoData.description
        event.return ({
          title: title,
          description: description,
          link: `http://www.bilibili.com/video/av${newestVideoData.aid}/`,
          media: {
            cover: newestVideoData.pic
          }
        })
      })
    }

    function getSeasonInfo(seasonId) {
      event.$get({
        url: `http://bangumi.bilibili.com/jsonp/seasoninfo/${seasonId}.ver`,
        dataType: 'text'
      }, (error, text) => {
        if (error)
          return event.return (false)

        text = text.replace(/^seasonListCallback\((.+)\)\;$/, (x, a) => a)
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
        event.return ({
          title,
          description,
          link: `http://bangumi.bilibili.com/anime/${seasonId}`,
          favicon: `http://www.bilibili.com/favicon.ico`,
          media: {
            cover: cover
          }
        })
      })
    }

    // season
    const seasonMatch = event.url.match(/bangumi\.bilibili\.com\/anime\/(\d+)/)
    if (seasonMatch) {
      const seasonId = seasonMatch[1]
      return getSeasonInfo(seasonId)
    }

    // av
    const avId = event.url.match(/bilibili\.com\/video\/av(\d+)/)[1]
    const targetUrl = `${http}://app.bilibili.com/bangumi/avseason/${avId}.ver`

    event.$get({
      url: targetUrl,
      dataType: 'text'
    }, (error, text) => {
      if (error)
        return event.return (false)
      text = text.replace(/^seasonJsonCallback\((.+)\)\;$/, (x, a) => a)
      const json = JSON.parse(text)
      if (json && json.message !== 'success')
        return event.return (false)
      const result = json.result
      const seasonId = result.season_id
      return getSeasonInfo(seasonId)
    })
  }
}