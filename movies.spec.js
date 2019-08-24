import movies from "./movies"

describe("Favourite Movies", () => {
  let myMovies
  beforeEach(() => {
    myMovies = [{
      title: "Ice Age",
      rate: null
    }]
  })
  test("can add a movie", () => {
    movies.add(myMovies, 'Avatar')
    expect(myMovies).toMatchSnapshot()
  })

  test("rate a movie", () => {
    movies.rate(myMovies[0], 5)
    expect(myMovies).toMatchSnapshot()
  })
})
