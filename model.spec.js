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

describe("all", () => {
  test("returns empty model", () => {
    const model = new Model();
    expect(model.all()).toEqual([])
  });

  test("returns model data", () => {
    const heroes = [{name: "Batman"}, {name: "Black Panther"}];
    const model = new Model(heroes);
    expect(model.all().length).toBe(2)
  });

  test("original data stays intact", () => {
    const model = new Model([{name: "Batman"}]);
    const data = model.all();
    data[0].name = "Joker";
    expect(model.$collection[0].name).toBe("Batman");
  })
});

describe("find", () => {
  test("returns null if nothing matches", () => {
    const model = new Model();
    expect(model.find("Batman")).toEqual(null);
  });

  test("return a matching entry", () => {
    const heroes = [{name: "Batman"}, {name: "Black Panther"}];
    const model = new Model(heroes);
    expect(model.find("Batman")).toEqual(heroes[0]);
  });
});