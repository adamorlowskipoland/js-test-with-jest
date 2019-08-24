const user = {
  name: "Tony Angeloos",
  age: 42,
  job: "inventor"
}

test("user matches", () => {
  expect(user).toMatchSnapshot()
})
