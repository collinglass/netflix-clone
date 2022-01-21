import movieTrailer from 'movie-trailer';
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  //A snipped of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and dont run again
    async function fetchData() {
      const requests = await axios.get(fetchUrl);
      setMovies(requests.data.results);
      return requests;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // video id
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log(error));
    }
  };

  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
