
{
  target_url: /http\:\/\/money\.cnn\.com\/quote\/(etf\/)*(quote|etf)\.html\?symb\=(.+)/,
  name: "stock price alert",
  description: "Check stock price, and alert when necessary.\nFor how to use, please check this [website](https://github.com/shd101wyy/Moni_Sample_Scripts/blob/master/scripts/stock/stock.md)",
  keywords: ["stock"],
  link: "https://github.com/shd101wyy/Moni_Sample_Scripts/blob/master/scripts/stock/stock.md",
  version: "0.0.4",
  public: true,
  script: function (event) { // event = {url, cheerio, $get}
	  event.$get({url: event.url, dataType: 'text'}, (error, body)=> {
      if (error) return event.return(false)
      const $ = event.cheerio.load(body)
      const title = $($('.wsod_fLeft')[0]).text()
      const currentPrice = parseFloat($($('.wsod_quoteData span')[0]).text())
      const time = $('.wsod_last .wsod_quoteLabel').text().replace('DataAs', 'Data as')
      const today_s_change = $('.wsod_change').text().replace('%T', '% T')

      let regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match = null
      while(match = regex.exec(event.url)) {
        params[match[1]] = match[2]
      }

      let max = null
      if (params['max']) {
        max = parseFloat(params['max'])
      }
      let min = null
      if (params['min']) {
        min = parseFloat(params['min'])
      }

      let description = `${currentPrice}
${today_s_change}
${time}`

      if (max) {
        description += '\nalert when >= ' + max
      }
      if (min) {
        description += '\nalert when <= ' + min
      }

	    let notificationOff = true
      if (max && currentPrice >= max) {
        notificationOff = false
      }

      if (min && currentPrice <= min) {
        notificationOff = false
      }

      event.return({
        title: title,
        description,
        link: event.url,
        description,
        favicon: "chrome://favicon/http://money.cnn.com/",
        notificationOff
      })
    })
  }
}
