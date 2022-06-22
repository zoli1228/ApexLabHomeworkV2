
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Spinner from "../Spinner"
import { useQuery } from "@apollo/client"
import query from "../../scripts/query"
import React, { useContext, useEffect, useState } from "react"

import style from "./movies.module.css"
import {
    ApolloProvider,
    InMemoryCache,
    ApolloClient
} from '@apollo/client'
import { Suspense } from "react"
import SearchBar from "../searchbar/SearchBar"
import { Context } from "../../Context"

const MOVIES_API = "https://tmdb.sandbox.zoosh.ie/dev/grphql"
const client = new ApolloClient({
    uri: MOVIES_API,
    cache: new InMemoryCache()
});



function ListMovies() {
    const { items, setItems } = useContext(Context)
    const navigate = useNavigate()
    const [search, setSearch] = useState(query.trending())
    const { term } = useParams()
    const location = useLocation()
    const path = location.pathname
    const findRelated = path.includes("/related/")

    useEffect(() => {
        if (!findRelated && term?.length > 0) {
            setSearch(query.search(term))
            setItems(prevState => ({ ...prevState, header: "Results for " + term }))
        } else if (findRelated && term.length > 0) {
            setItems(prevState => ({ ...prevState, header: "Movies related to " + term }))
        } else {
            setSearch(query.trending())
            setItems(prevState => ({ ...prevState, header: "Trending Movies" }))
        }
    }, [search, navigate, findRelated, items.header])

    const Card = React.lazy(() => import("../card/Card"))
    const solveQuery = findRelated ? query.similarMovies(term) : search
    const { loading, error, data } = useQuery(solveQuery)
    if (search) {
        if (loading) return <Spinner />
        if (error) return <div>Error</div>
        if (data) {
            const movies = data.movies ? data.movies : data.searchMovies[0]?.similar || data.searchMovies
            if (movies.length > 0) {
                return (
                    <Suspense fallback={<Spinner />}>
                        <div className="header">
                            <SearchBar />
                        </div>
                        {movies.map((data) => (
                            <Card data={data} key={data.id} />
                        ))}
                    </Suspense>
                )
            }
            return <h1>No movie found matching your search. :(</h1>
        }
    }
}

export default function Movies() {
    const { items } = useContext(Context)
    const navigate = useNavigate()
    return (
        <ApolloProvider client={client}>
            <>
                <div className="header">
                    <h1>{items.header}</h1>
                </div>
                <div className={style.movieContainer}>
                    <ListMovies />
                </div>
                <div className="footer">
                    <div className="btnContainer">
                        <Link to="/">Home</Link>
                        <button onClick={() => navigate(-1)}>Back</button>

                    </div>
                </div>
            </>
            <Outlet />
        </ApolloProvider>
    )
}