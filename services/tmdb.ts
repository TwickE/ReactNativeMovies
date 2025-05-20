export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async ({ query, pageNumber, language }: { query: string, pageNumber: number, language: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURI(query)}&include_adult=false&language=${language === 'en' ? 'en-Us' : 'pt-PT'}&page=${pageNumber}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?&include_adult=false&language=${language === 'en' ? 'en-Us' : 'pt-PT'}&page=${pageNumber}&sort_by=popularity.desc`;

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

export const fetchMovieDetails = async (MovieId: string, language: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${MovieId}?language=${language === 'en' ? 'en-Us' : 'pt-PT'}&api_key=${TMDB_CONFIG.API_KEY}`, {
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