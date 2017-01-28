
{
  target_url: /(http|https)\:\/\/space\.bilibili\.com\/(\d)+?/,
  name: "Bilibili up主 视频",
  description: "Bilibili up主 视频更新提醒",
  keywords: ["bilibili", "up"],
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio}
      const id = event.url.match(/(\d+)/)[0]
      event.$get(`http://space.bilibili.com/ajax/member/getSubmitVideos?mid=${id}&pagesize=1`, (error, json)=> {
        const $ = event.cheerio.load(event.body)
		// let title = $('title').text().replace(/-.*/, '') + ' bilibili'
        const newestVideoData = json.data.vlist[0]
        const title = newestVideoData.title
        const description = `${newestVideoData.description}
[${$('title').text().replace(/-.*/, '')}](${event.url})`
        event.return({
          title: title,
          description: description,
          link: `http://www.bilibili.com/video/av${newestVideoData.aid}/`,
          media: {cover: newestVideoData.pic}
        })
      })
    }
}
