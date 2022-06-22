import React, { Suspense } from "react"
import NotFound from "./modules/notfound/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "./modules/Spinner"

const Home = React.lazy(() => import('./modules/home/Home'));
const Movies = React.lazy(() => import("./modules/movies/Movies"));
const MovieDetails = React.lazy(() => import("./modules/details/MovieDetails"));
const WikiDetails = React.lazy(() => import("./modules/details/WikiDetails"));

export default function PageHandler() {
    return (
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/search/:term" element={<Movies />} />
                    <Route path="/movies/related/:term" element={<Movies />} />
                    <Route path="/movies/wikipedia/:name" element={<WikiDetails />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}
