
{
  target_url: "https://time.is",
  name: "current time",
  description: "display current time",
  keywords: ["time"],
  link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
  version: "0.0.2",
  public: true,
  script: function (event) {
    event.$get(event.url, (error, body)=> {
      if (error) return event.return(false)
      const $ = event.cheerio.load(body)
      event.return({
        title: "Time now",
        description: $("#clock0").text(),
        link: "https://time.is",
      })
    })
  }
}
