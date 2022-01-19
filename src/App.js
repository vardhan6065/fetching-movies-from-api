import React ,{useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies , setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler= useCallback(async() => {
    setIsLoading(true);
    setError(null);

    try {
      const response= await fetch('https://swapi.py4e.com/api/films/');
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const data= await response.json();  

      // setIsLoading(false); here also is ok kyuki iske baad synchronous he becuz there isn't any await.  
      
    const transformedMovies = data.results.map(moviesData => {
      return {
        id: moviesData.episode_id,
        title : moviesData.title,
        openingText: moviesData.opening_crawl,
        releaseDate: moviesData.release_date,
      }
      });
      
      setMovies(transformedMovies);
    } catch(error){
      setError(error.message);
    }
    setIsLoading(false);
    }, []);  

    
  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

    let content= <p>Found no Movies</p>;

    if(movies.length > 0){
    content= <MoviesList movies={movies} />;
    } 
      
    if(error){
      content= <p>{error}</p>;
    }

    if(isLoading){
      content= <p>Loading..</p>;
    }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
