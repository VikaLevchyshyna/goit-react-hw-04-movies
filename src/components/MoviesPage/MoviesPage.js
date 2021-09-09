import { useState, useEffect } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import moviesApi from '../../services/moviesApi';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const { url } = useRouteMatch();
  const [request, SetRequest] = useState('');
  const location = useLocation();

  const handleRequestChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    SetRequest(query);
  };

  useEffect(() => {
    const renderMoviesByQyery = () => {
      moviesApi.fetchMoviesByQuery(request).then(setMovies);
    };
    renderMoviesByQyery();
  }, [request]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies here"
          value={query}
          onChange={handleRequestChange}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      {movies && (
        <>
          <ul>
            {movies.map(({ title, id }) => (
              <NavLink
                to={{
                  pathname: `${url}/${id}`,
                  state: {
                    from: location.pathname,
                  },
                }}
              >
                <li key={id}>{title}</li>
              </NavLink>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
