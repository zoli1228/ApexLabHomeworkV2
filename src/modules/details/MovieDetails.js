import { useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ApolloProvider, useQuery, InMemoryCache, ApolloClient } from "@apollo/client"
import { Context } from "../../Context"
import style from "./movie-details.module.css"
import query from "../../scripts/query"
import Spinner from "../Spinner"

const MOVIES_API = "https://tmdb.sandbox.zoosh.ie/dev/grphql"
const client = new ApolloClient({
    uri: MOVIES_API,
    cache: new InMemoryCache()
});

function FetchMovieDetails(props) {
    const id = props.id.id
    const { loading, error, data } = useQuery(query.getMovie(id))
    if (loading) return <Spinner />
    if (error) return <div>Error, message: <p>{error.message}</p></div>
    if (data) return <HasMovieDetails movie={data} state={props.state}/>
}

function fetchIMDb(movieName, e) {
    const text = e.target.innerHTML
    e.target.innerHTML = "Redirecting..."
    fetch(query.imdb.getPageId(movieName))
        .then(response => response.json())
        .then(json => {
            const id = json.results[0].id
            e.target.innerHTML = text
            window.open(`https://www.imdb.com/title/${id}/`)
        })
        .catch(() => {
            e.target.innerHTML = "No luck :("
            setTimeout(() => {
                e.target.innerHTML = text
            }, 3000)
            return
        })

}

function HasMovieDetails(props) {
    useEffect(() => {
        let removedDetails = false
        if(!removedDetails) {
            setItems(prevState => ({...prevState, selectedMovie: null}))
            removedDetails = true
        }
    }, [])
    const navigate = useNavigate()
    const movie = props.movie.movie
    const NO_IMAGE = "https://icon-library.com/images/not-found-icon/not-found-icon-18.jpg"
    const img = movie.img?.url ? movie.img.url : NO_IMAGE
    const {setItems} = props.state

    return (
        <div className={style.detailsTab}>
            <div className={style.posterContainer}>
                <img alt={movie.name + " poster image"} src={img} />
            </div>
            <div className={style.heading}>
                <h1>{movie.name}</h1>
            </div>
            <div className={style.description}>
                <p>Released: {movie.releaseDate.slice(0, movie.releaseDate.indexOf("T"))}</p>
                <p>Score: {movie.score.toFixed(1)}</p>
                <p>{movie.overview}</p>
            </div>
            <div className={style.btnContainer}>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => {
                    navigate(`/movies/wikipedia/${movie.name}`, { replace: false, state: {img: img}})
                }}>Wikipedia</button>
                <button onClick={(e) => {
                    fetchIMDb(movie.name, e)
                }}>IMDb</button>
                <button onClick={() => {
                    navigate(`/movies/related/${movie.name}`, { replace: false })
            }}>Related</button>
                
            </div>
        </div>
    )
}

export default function MovieDetails() {
    const id = useParams()
    const { items, setItems } = useContext(Context)

    if (items.selectedMovie) {
        const movie = items.selectedMovie
        return <HasMovieDetails movie={{ movie: movie }} state={{items, setItems}} />
    }

    return (
        <ApolloProvider client={client}>
            <FetchMovieDetails id={id} state={{items, setItems}} />
        </ApolloProvider>
    )
}