import {useState,useEffect} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=70124614';

const movie1={
    "Title": "Fantastika vs. Wonderwoman",
    "Year": "1976",
    "imdbID": "tt1185643",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {

    const [movies,setMovies] = useState([]);
   
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        

        setMovies(data.Search);
    }

    useEffect(()=> {
        searchMovies('superman');
    }, []);

    return (

        <div className='app'>
            <h1>MovieLand</h1>

            <div className="search">
                <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() =>searchMovies(searchTerm)}
                />
            </div>

            {movies?.length>0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                         <MovieCard movie = {movie}/> 
                        ))}
                    </div>
                ):(
                    <div className='empty'>
                        <h2>No Movies found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;
