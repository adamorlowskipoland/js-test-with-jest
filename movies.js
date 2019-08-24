export default {
  add(movies, newMovie) {
    movies.push({
      title: newMovie,
      rate: null
    })
  },
  rate(movie, rate) {
    movie.rate = rate
  }
}
