
{
  target_url: /^(http|https):\/\/manhua\.dmzj\.com\/(.+)(\/*)/,
  name: "动漫之家漫画订阅",
  description: "动漫之家漫画订阅",
  keywords: ["dmzj", "manga"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts",
  version: "0.0.3",
  public: true,
  script: function (event) { // event = {url, cheerio, $get}
      const http = event.url.match(/^(http|https):\/\//)[1],
            name = event.url.match(/manhua\.dmzj\.com\/([^/]+)/)[1]
      event.$get(`${http}://manhua.dmzj.com/${name}`, function(error, body) {
      	if (error) return event.return(false)
		const name = body.match(/var\sg\_comic\_name\s\=\s\"([^\"]+)\"/)[1],
              comicUrl = body.match(/var\sg\_comic\_url\s\=\s\"([^\"]+)\"/)[1],
              lastUpdate = body.match(/var\sg\_last\_update\s\=\s\"([^\"]+)\"/)[1],
              lastChapterId = body.match(/var\sg\_last\_chapter\_id\s\=\s\"([^\"]+)\"/)[1],
              updateTime = body.match(/\<span\sclass\=\"update2\"\>(.+)\<\/span\>/)[1]

        const link = `http://manhua.dmzj.com/${comicUrl}`,
              lastChapterLink = `${link}${lastChapterId}.shtml#@page=1`

        const cover = body.match(/<img(.+)src\="([^\"]+)"(\s+)id\=\"cover_pic\"/)[2]

        event.return({
          title: name + ' (动漫之家)',
          description: `[${lastUpdate}](${lastChapterLink})\n${updateTime}`,
          link: `http://manhua.dmzj.com/${comicUrl}`,
          favicon: `${http}://manhua.dmzj.com/favicon.ico`,
          media: {cover}
        })
      })
    }
}
