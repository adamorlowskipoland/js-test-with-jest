import Model from "./model"

test('new works', () => {
  expect(new Model).toBeInstanceOf(Model)
});

test("model structure", () => {
  expect(new Model).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
  }))
});

describe("record", () => {
  test("can add data to the collections", () => {
    const heroes = [
      {name: "Batman"},
      {name: "Black Panther"}
    ];
    const model = new Model();
    model.record(heroes);
    expect(model.$collection).toEqual(heroes)
  })
});
