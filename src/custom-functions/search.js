const client_id = "715f2d46ba13c40d7b0e4f7a8a29cba7";

export const searchImgur = (query) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${client_id}&query=${query}`,
    {
      method: "GET",
    }
  );
};
