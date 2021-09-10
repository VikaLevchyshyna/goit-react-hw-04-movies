import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import moviesApi from '../../services/moviesApi';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [isVisibleCast, setIsVisibleCast] = useState(false);
  const [isVisibleReviews, setIsVisibleReviews] = useState(false);

  useEffect(() => {
    const renderMovieDetails = () => {
      moviesApi.fetchMovieDetails(movieId).then(setMovie);
    };
    renderMovieDetails();
  }, [movieId]);

  const makeVisibleCast = () => {
    if (isVisibleReviews === true) {
      setIsVisibleReviews(false);
    }
    setIsVisibleCast(true);
  };

  const makeVisibleReviews = () => {
    if (isVisibleCast === true) {
      setIsVisibleCast(false);
    }

    setIsVisibleReviews(true);
  };

  const goBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push('/');
  };

  return (
    <>
      <button onClick={goBack}>
        <span>Go Back</span>
      </button>
      {movie && (
        <>
          <img src={`${srcBaseUrl}${movie.poster_path}`} alt={movie.title} />
          <h3>
            {movie.title}({movie.release_date.split('-')[0]})
          </h3>
          <span>User Score: {movie.vote_average * 10}%</span>
          <h2>Overview</h2>
          <span>{movie.overview}</span>
          {<h3>Genres</h3>}
          {<span>{movie.genres.map(genre => genre.name).join(' ')}</span>}
          <hr />
          <span>Additional information</span>
          <span role="img" aria-label="face emoji">
            👇🏻
          </span>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                }}
                onClick={makeVisibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                }}
                onClick={makeVisibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />

          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path={`${path}/:cast`}>
              {movie && isVisibleCast && <Cast />}
            </Route>

            <Route path={`${path}/:reviews`}>
              {movie && isVisibleReviews && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
