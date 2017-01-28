
{
  target_url: /^https:\/\/courses\.illinois\.edu\/schedule\/(\d)+?\/(spring|winter|summer|fall)\/(\w)+?\/(\d)+?$/,
  name: "UIUC course explorer tracker",
  description: "used to track course status update",
  keywords: ["UIUC", "course"],
  version: "0.0.1",
  script: function (event) { // event = {body, url, cheerio}
	  const $ = event.cheerio.load(event.body)
      const s = $("script[type=\"text/javascript\"]").text()
      const d = s.slice(s.indexOf('['), s.indexOf(']') + 1)
      const arr = JSON.parse(d)
      let title = $('.app-inline').text()
      let description = ""
      arr.forEach((a)=> {
      	const availability = a.availability
        const crn = a.crn
        const sectionTitle = a.sectionTitle || ''

      	description += (crn + (sectionTitle? (" " + sectionTitle + ": ") : ": ") + availability + "\n\n")
      })

      event.return({
        title: title,
        description: description,
        link: event.url,
      })
    }
}
