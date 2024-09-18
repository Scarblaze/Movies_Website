//vinit more

import { useState, useEffect } from 'react';  //useEffect shows the stuff once you open the page
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from "./search.svg";
const API_URL = 'http://www.omdbapi.com?apikey=3cdcaeaa';

const App = () => {
    const [movies, setMovies] = useState([]);  //empty array for data collection
    const [searchTerm, setSearchTerm] = useState(''); //movies: int, setMovies: i

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`); //to get data
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} //changing stuff on search bar
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />//if no data in the array then you must do this. the if-else thing
                            ))}                                                 
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;
