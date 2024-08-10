import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewForm/ReviewForm';
import './Reviews.css';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const { movieId } = useParams();
    const [displayedReviews, setDisplayedReviews] = useState([]);

    useEffect(() => {
        if (movieId) {
            getMovieData(movieId);
        }
    }, [movieId, getMovieData]);

    useEffect(() => {
        if (reviews) {
            setDisplayedReviews(reviews.slice(0, 5));
        }
    }, [reviews]);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current.value;

        if (!rev.trim()) {
            console.error("Review text cannot be empty");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reviewBody: rev,
                    imdbId: movie?.imdbId,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();

            setReviews((prevReviews) => {
                const updatedReviews = [...prevReviews, { body: rev, id: result.id }];
                setDisplayedReviews(updatedReviews.slice(0, 5));
                return updatedReviews;
            });

            revText.current.value = "";
        } catch (err) {
            console.error('Failed to add review:', err.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3 className="review-header">Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img className="movie-poster" src={movie?.poster} alt="Movie Poster" />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {displayedReviews.map((r) => (
                        <React.Fragment key={r.id}>
                            <Row>
                                <Col className="review-body">{r.body}</Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
