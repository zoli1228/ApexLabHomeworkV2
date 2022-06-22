## Apex Labs Homework - Movie Site with React v2

This is my second try with React, a lot more optimized and stable version of the movie site. It now uses React Router aswell, so movies can be shared by link, and added support for the functionality of the 'back' button.

_Functional requirements:_
- Have a movie title search box on the UI, on enter/click of a button it requests the search results from our graphql sandbox for TMDB: https://tmdb.sandbox.zoosh.ie/dev/grphql

- It displays the results and some of their data (name, category, score) in a list, titles can be clicked

- By clicking on an address, the app tries to find the related English wikipedia page (with a REST request) and then displays a summary of it in a detail panel (e.g. first paragraph), along with a clickable link that opens in a new window in IMDB and wikipedia

- Bonus: Dual state search engine; a “related” button next to the two links in the movie: this switches the movie list from search results to a list of related movies related to the selected movie

_Levels:_
+ A working web page
+ Spinner while loading data from TMDBW or wikipedia
+ Search for related movies
+ Bonus # 1: Use Material-UI library, Material-UI look
+ Bonus # 2: Tests


It can also be a little bigger bite, we leave it up to you how far you want to go with it and whether you also deal with bonus tasks. Obviously, a junior can solve less, while a senior more in a period of time, but what interests us the most is the quality of the code itself that is born in that time.

MOVIES_API: https://tmdb.sandbox.zoosh.ie/dev/grphql (Apollo Graphql)
