# page-filter
This is a nest.js service which implements an endpoint for passing an html string and filter. The controller will parse the html and find the string using cheerio. Finally, it returns the filtered content. This is particularly useful in node.js environments.

I built this to work with a gumloop flow. After gumloop scrapes a page, I wanted to be able to filter down that content. For whatever reason, the gumloop action does not filter the content, so I'm passing the page content through my api service. This significantly reduces the amount of content we then send to AI services.