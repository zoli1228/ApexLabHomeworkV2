import { createRef } from 'react'
import style from './searchbar.module.css'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


export default function SearchBar() {
    const navigate = useNavigate()
    const searchInput = createRef()
    const handleInput = useCallback(() => {
        if (searchInput.current.value.length > 0) {
            navigate(`/movies/search/${searchInput.current.value}`, { replace: false })
        }
    }, [navigate, searchInput]);

    return (
        <div className="search">
            <input autoFocus className={style.searchbar} type="search" placeholder="Search" ref={searchInput} onKeyDown={(e) => {
                if (e.key === "Enter") handleInput()
            }} />
            <button onClick={handleInput}>Search</button>
        </div>
    )
}