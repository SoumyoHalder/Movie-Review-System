import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-material-ui-carousel';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = ({ movies }) => {
    const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);
    const navigate = useNavigate();

    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }
    useEffect(() => {
        const backdropCount = movies[0]?.backdrops.length || 0;
        if (backdropCount > 1) {
            const interval = setInterval(() => {
                setCurrentBackdropIndex(prevIndex => (prevIndex + 1) % backdropCount);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [movies]);

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies?.map((movie) => {
                        const backdropCount = movie.backdrops.length;
                        const backdropStyle = {
                            backgroundImage: backdropCount > 0
                                ? `url(${movie.backdrops[currentBackdropIndex]})`
                                : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        };

                        return (
                            <Paper key={movie.imdbId}>
                                <div className='movie-card-container'>
                                    <div className='movie-card' style={backdropStyle}>
                                        <div className='movie-detail'>
                                            <div className='movie-poster'>
                                                <img src={movie.poster} alt="" />
                                            </div>
                                            <div className='movie-title'>
                                                <h2>{movie.title}</h2>
                                                <p>Genres: {movie.genres.join(', ')}</p> 
                                            </div>
                                            <div className='movie-buttons-container'>
                                                <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                    <div className='play-button-icon-container'>
                                                        <FontAwesomeIcon className='play-button-icon'
                                                            icon={faCirclePlay}
                                                        />
                                                    </div>
                                                </Link>

                                                <div className='movie-review-button-container'>
                                                    <Button variant='info' onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        );
                    })
                }
            </Carousel>
        </div>
    );
}

export default Hero;
