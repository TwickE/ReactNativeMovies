export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async ({ query, pageNumber }: { query: string, pageNumber: number }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURI(query)}&include_adult=false&language=en-Us&page=${pageNumber}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?&include_adult=false&language=en-Us&page=${pageNumber}&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error('Failed to fetch movies', response.statusText);
  }

  const data = await response.json();

  return data;
}

export const fetchMovieDetails = async (MovieId: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${MovieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
      method: 'GET',
      headers: TMDB_CONFIG.headers
    });

    if (!response.ok) {
      // @ts-ignore
      throw new Error('Failed to fetch movie details', response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}