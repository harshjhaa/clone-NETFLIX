import React, { useState, useEffect } from 'react';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css'

const base_url_img = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const opts = {
        height: "350",
        with: "100",
        playerVars: {
            autoplay: 1
        }
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl])

    // console.table(movies);

    const handleClick = (movie) => {
        console.log(movie)
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            console.log(movie?.title);
            console.log(movie?.name);
            console.log(movie?.original_name);
            movieTrailer(movie?.original_name || movie?.title || movie?.name || "")
                .then(url => {
                    console.log(url);
                    //https://www.youtube.com/watch?v=<videoID>
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(err => console.log(err));
        }
    }

    const getPosters = () => {
        return movies.map(movie => {
            return (
                <img
                    key={movie.id}
                    className={`row-poster ${isLargeRow && "row-poster-large"}`}
                    src={`${base_url_img}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
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
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
