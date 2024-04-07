import React, { useState, useEffect } from 'react';
import searchIcon from './Search.svg';
import MovieCard from './MovieCaed';

const API_URL = 'https://www.omdbapi.com?apikey=ebcef97d';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('search');
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className='app'>
        <h1>MovieLand</h1>

        <div className='search'>
          <input
            value={searchValue}
            placeholder='Search for a movie'
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <img src={searchIcon} alt='search' onClick={() => searchMovies(searchValue)} />
        </div>
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
