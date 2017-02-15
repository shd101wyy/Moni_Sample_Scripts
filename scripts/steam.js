
  {
    target_url: /(http|https)\:\/\/store\.steampowered\.com\/app\/(\d+)/,
    name: "steam price tracker",
    description: "track steam game/app price",
    keywords: ["steam", "game"],
    link: 'https://github.com/shd101wyy/Moni_Sample_Scripts',
    version: "0.0.1",
    public: true, // set to true if you want to publish this script so others can find it
    script: function(event) { // event = {url, cheerio, $get}
      const match = event.url.match(/(http|https)\:\/\/store\.steampowered\.com\/app\/(\d+)/),
            http = match[1],
            gameId = match[2]
      const targetUrl = `${http}://store.steampowered.com/app/${gameId}/`
      event.$get(targetUrl, (error, body)=> {
        if (error) return event.return(false)
        const $ = event.cheerio.load(body)
        const gameTitle = $('title').text()
        const cover = $('.game_header_image_full').attr('src')

        const gamePurchaseWrapper = $('.game_area_purchase_game_wrapper')
        let description = ""
        for (let i = 0; i < gamePurchaseWrapper.length; i++) {
          const wrapper = $(gamePurchaseWrapper[i])
        	const t = $('h1', wrapper).text()
        	let price = $('.game_purchase_price.price', wrapper).text()
        	if (!price.trim().length)
         		price = $('.discount_final_price', wrapper).text() + ' / ' + $('.discount_original_price', wrapper).text()

         	 description += `${t} ${price}\n`
        }
        description = description.trim()

        if (!description.length) description = "no price provided"

        event.return({
          title: gameTitle + gamePurchaseWrapper.length,
          description,
          link: targetUrl,
          media: {cover}
        })
      })
    }
  }
