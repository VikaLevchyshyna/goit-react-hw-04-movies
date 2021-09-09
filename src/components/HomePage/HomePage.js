import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import moviesApi from '../../services/moviesApi';
import s from './HomePage.module.css';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();

  useEffect(() => {
    const renderTrendingMovies = () => {
      moviesApi
        .fetchTrendingMovies()
        .then(response => setTrendingMovies(response));
    };
    renderTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={s.titleHomePage}>Trending Today</h1>
      <ul className={s.filmsList}>
        {trendingMovies.map(({ poster_path, title, id }) => (
          <li key={id} className={s.filmsListItem}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: {
                  from: location.pathname,
                },
              }}
            >
              <img src={`${srcBaseUrl}${poster_path}`} alt="" />
              <h3 className={s.titleFilmsListItem}>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
