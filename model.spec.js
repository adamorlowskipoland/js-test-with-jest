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
  const heroes = [{name: "Batman"}, {name: "Black Panther"}];

  test("can add data to the collections", () => {
    const model = new Model();
    model.record(heroes);
    expect(model.$collection).toEqual(heroes)
  });
  test("gets called when data is passed to Model", () => {
    const spyRecord = jest.spyOn(Model.prototype, "record");
    new Model(heroes);
    expect(spyRecord).toHaveBeenCalled();
    spyRecord.mockRestore();
  })
});
