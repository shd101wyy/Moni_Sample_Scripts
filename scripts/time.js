
{
  target_url: "https://time.is",
  name: "current time",
  description: "display current time",
  keywords: ["time"],
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio}
    const $ = event.cheerio.load(event.body)
    event.return({
      title: "Title now",
      description: $("#clock0").text(),
      link: "https://time.is",
    })
  }
}
