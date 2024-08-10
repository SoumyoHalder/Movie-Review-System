package dev.soumyo.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Movie> findAllMovies() {
        return repository.findAll();
    }
    public Optional<Movie> findMovieByImdbId(String imdbId) {
        return repository.findMovieByImdbId(imdbId);
    }
    public Optional<List<Review>> findReviewsByMovieImdbId(String imdbId) {
        Optional<Movie> movie = repository.findMovieByImdbId(imdbId);
        if (movie.isPresent()) {
            List<ObjectId> reviewIds = movie.get().getReviewIds()
                    .stream()
                    .map(Review::getId)
                    .collect(Collectors.toList());

            List<Review> reviews = reviewRepository.findAllById(reviewIds);
            return Optional.of(reviews);
        }
        return Optional.empty();
    }
}
