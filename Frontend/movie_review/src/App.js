import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Header from './components/header/Header';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import Reviews from './components/reviews/Reviews';
import Trailer from './components/trailer/Trailer';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/movies", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        setMovies(data.map((movie) => ({ ...movie, genres: movie.genres || [] })));
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Failed to fetch movies:', err.message);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const singleMovie = await response.json();

      if (singleMovie && typeof singleMovie === 'object') {
        setMovie(singleMovie);

        const reviewsResponse = await fetch(`http://localhost:8080/api/v1/movies/${singleMovie.imdbId}/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!reviewsResponse.ok) {
          throw new Error(`HTTP error! Status: ${reviewsResponse.status} - ${reviewsResponse.statusText}`);
        }

        const reviewsData = await reviewsResponse.json();

        // Store the reviews in the state
        setReviews(reviewsData || []);
      } else {
        throw new Error('Invalid movie data format received');
      }
    } catch (error) {
      console.error('Failed to fetch movie data or reviews:', error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
