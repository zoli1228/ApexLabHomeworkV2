import style from "./card.module.css"
import { useContext } from "react"
import { Context } from "../../Context"
import { Link, Outlet } from "react-router-dom"

const NO_IMAGE = "https://icon-library.com/images/not-found-icon/not-found-icon-18.jpg"

function handleClick(movie, items, setItems) {
    const isOpen = items.movieDetailsOpen
    setItems(prevState => ({ ...prevState, movieDetailsOpen: !isOpen, selectedMovie: movie }))
}

function CardView(props) {
    const { items, setItems, data } = props

    return (
        <>
            <Link onClick={() => handleClick(data, items, setItems)} className={style.card} to={`/movie/${data.id}`}>
                <div className={style.imgContainer}>
                    <img src={data.img?.url ? data.img.url : NO_IMAGE} alt={data.title + " poster"} />
                </div>
                <p>{data.name}</p>
            </Link>
            <Outlet />
        </>
    )
}

export default function Card(props) {
    const { items, setItems } = useContext(Context)
    return <CardView data={props.data} items={items} setItems={setItems} />
}