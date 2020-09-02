import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css'

const base_url_img = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl])

    // console.table(movies);

    const getPosters = () => {
        return movies.map(movie => {
            return (
                <img
                    key={movie.id}
                    className={`row-poster ${isLargeRow && "row-poster-large"}`}
                    src={`${base_url_img}${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                    alt={movie.name}
                />
            );
        });
    }

    return (
        <div className="row">
            <h3>{title}</h3>
            <div className="row-posters">
                {getPosters()}
            </div>
        </div>
    )
}

export default Row;
