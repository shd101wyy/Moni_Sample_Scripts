
  {
    target_url: "https://www.google.com",
    name: "my script",
    description: "description of your script",
    keywords: ["script"],
    version: "0.0.1",
    // private: true,
    script: function(event) { // event = {body, url, cheerio}
      event.$get('https://www.google.com', function(error, body) {
        event.return({
                title: 'haha ' + error,
        		description: body,
		        link: "https://www.google.com",
        })
      })
    }
  }
  