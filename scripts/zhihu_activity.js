
  {
    target_url: /^(https|http)\:\/\/www\.zhihu\.com\/people\/(.+)\/activities(\/*)$/,
    name: "知乎 用户动态",
    description: "知乎 用户动态跟踪",
    keywords: ["zhihu"],
    link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: false, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {body, url, cheerio, $get}
      event.$get(event.url, (error, body)=> {
        if (error) return event.return(false)
        const $ = event.cheerio.load(body)
        const title = $($('title')[0]).text() + '动态'
        const listItem = $($('.List-item')[0])
        const contentTitle = $('.ContentItem-title', listItem).text()
        const url = 'https://www.zhihu.com' + $('.ContentItem-title a').attr('href')
        const status = $('.ActivityItem-metaTitle', listItem).text()
        event.return({
          title,
          description: `${status}
  [${contentTitle}](${url})`,
      link: event.url,
  //        favicon: "(optional) favicon? eg: https://github.com/favicon.ico",
  //        media: {cover: "(optional) media to put"}
        })
      })
    }
  }
