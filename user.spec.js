import User from "./user.js"

describe('User', () => {
  test('get name return full name', () => {
    const user = new User({ firstname: 'Jane', lastname: 'Doe'})
    expect(user.name).toBe('Jane Doe')
  })
})
