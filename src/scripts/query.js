import { gql } from "@apollo/client";

const query = {
  trending: () => {
    return (gql`
        query fetchPopular {
            movies: popularMovies {
              id
              name
              overview
              genres {name}
              score
              releaseDate
              img: poster {
                url: custom(size: "w185_and_h278_bestv2")
              }
            }
          }
        `)
  },
  getMovie: (id) => {
    return (gql`
    query getMovie {
      movie(id: ${id}) {
        id
          name
            overview
            genres {name}
            score
            releaseDate
            adult
            img: poster {
              url: custom(size: "w185_and_h278_bestv2")
          }
      }
    }`)
  },
  search: (term) => {
    return (gql`
        query SearchMovies {
            searchMovies(query: "${term}") {
              id
              name
              overview
              genres {name}
              score
              releaseDate
              adult
              img: poster {
                url: custom(size: "w185_and_h278_bestv2")
              }
            }
          }`)
  },
  similarMovies: (term) => {
    return (gql`
        query SearchMovies {
            searchMovies(query: "${term}") {
                similar {
                    id
                    name
                    overview
                    genres {
                      name
                    }
                    score
                    releaseDate
                    adult
                    img: poster {
                        url: custom(size: "w185_and_h278_bestv2")
                    }
                }   
            }
        }
        `)
  },
  wikipedia: {
    getPageId: (term) => { return `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=search&iwurl=1&srsearch=${term}%202%20incategory%3Aenglish-language_films&srnamespace=0&srlimit=1&srqiprofile=engine_autoselect&srsort=relevance` },
    getExtract: (id) => { return `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cdescription%7Cinfo&list=&iwurl=1&pageids=${id}&exintro=1&explaintext=1&exsectionformat=plain&inprop=url` }

  },
  imdb: {
    getPageId: (term) => { return `https://imdb-api.com/en/API/SearchMovie/k_39p91136/${term}` },
    getLinkById: (id) => { return `https://imdb-api.com/en/API/ExternalSites/k_39p91136/${id}/` }

  }
}

export default query