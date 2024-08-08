import React, { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const { movieId } = useParams();

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId, getMovieData]);

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
                    imdbId: movieId,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();

            setReviews((prevReviews) => [...prevReviews, { body: rev, id: result.id }]);
            revText.current.value = "";
        } catch (err) {
            console.error('Failed to add review:', err.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="Movie Poster" />
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
                    {reviews?.map((r) => (
                        <React.Fragment key={r.id}> {/* Use a unique key */}
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
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
