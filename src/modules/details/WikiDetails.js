import React, { useState } from 'react'
import { useParams, useNavigate, useLocation  } from 'react-router-dom'
import query from '../../scripts/query'
import Spinner from '../Spinner'
import style from './movie-details.module.css'
import NotFound from '../notfound/NotFound'
export default function WikiDetails() {


    const navigate = useNavigate()
    const [data, setData] = useState({ movie: null, hasData: false, showError: false })
    const {name} = useParams()
    const img = useLocation().state.img

    if (!data.hasData) {
        fetch(query.wikipedia.getPageId(name))
            .then(response => response.json())
            .then(json => {
                const pageId = json.query.search[0].pageid
                fetch(query.wikipedia.getExtract(pageId))
                    .then(response => response.json())
                    .then(json => {
                        const movie = json.query.pages[Object.keys(json.query.pages)[0]]
                        if(!movie) setData(prevState => ({...prevState, showError: true }))
                        setData(prevState => ({...prevState, movie: movie, hasData: true }))
                    })
            })
            .catch(() => {
                setData(prevState => ({...prevState, showError: true }))
            })
    }

    if (data.hasData) {
        const movie = data.movie
        return (
            <div className={style.detailsTab}>
                <div className={style.posterContainer}>
                    <img alt={movie.title + " poster image"} src={img} />
                </div>
                <div className={style.heading}>
                    <h1>{movie.title}</h1>
                </div>
                <div className={style.description}>
                    <p>{movie.description}</p>
                    <p>{movie.extract}</p>
                    <span>Data provided by Wikipedia</span>
                </div>
                <div className={style.btnContainer}>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <button onClick={() => window.open(movie.fullurl)}>Read more on Wikipedia!</button>
                </div>
            </div>
        )
    } else if(data.showError){
        return <NotFound />
    }
    return <Spinner />
}