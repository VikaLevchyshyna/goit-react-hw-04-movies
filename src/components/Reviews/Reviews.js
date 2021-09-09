import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moviesApi from '../../services/moviesApi';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const renderMovieReviews = () => {
      moviesApi.fetchMovieReviews(movieId).then(setReviews);
    };
    renderMovieReviews();
  }, [movieId]);
  console.log(reviews);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>{author}</h2>
              <span>{content}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span>We don't have reviews for this movie.</span>
      )}
    </>
  );
}
