const axios = require("axios");

exports.fetchFilms = async (title: string) => {
  if (title === undefined) {
    throw {
      status: 400,
      msg: "Invalid search term",
    };
  }
  const tmdbKey = process.env.TMDB_KEY;
  const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbKey}`,
    },
  });

  const {
    data: { results },
  } = await tmdbApi.get(`/search/movie?query=${title}&include_adult=false`);

  return results.map((result: any) => {
    return {
      tmdb_id: result.id,
      title: result.title,
      year: parseInt(result.release_date.slice(0, 4)),
      poster_url: `https://image.tmdb.org/t/p/original${result.poster_path}`,
    };
  });
};
