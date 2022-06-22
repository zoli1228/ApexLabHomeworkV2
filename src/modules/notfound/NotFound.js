import { Outlet, Link, useNavigate } from "react-router-dom"



export default function NotFound() {

    const navigate = useNavigate()
    return (
        <>
            <div>
                <h1>
                    Sorry, the page you are looking for cannot be found.
                </h1>
                <div className="footer">
                    <div className="btnContainer">
                        <Link to="/">Home</Link>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}