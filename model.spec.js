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
  const heroes = [{id: 1, name: "Batman"}, {name: "Black Panther"}];

  test("can add data to the collections", () => {
    const model = new Model();
    model.record(heroes);
    expect(model.$collection).toEqual([
      heroes[0],
      {
        id: expect.any(Number),
        name: heroes[1].name,
      }
    ])
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
  const heroes = [{id: 1, name: "Batman"}, {id: 2, name: "Black Panther"}];
  test("returns null if nothing matches", () => {
    const model = new Model();
    expect(model.find("Batman")).toEqual(null);
  });

  test("returns a matching entry", () => {
    const model = new Model(heroes);
    expect(model.find(1)).toEqual(heroes[0]);
  });

  test("returned entry is a copy, original value stays intact", () => {
    const model = new Model(heroes);
    const foundEntry = model.find(1);
    foundEntry.name = "Robin";
    expect(model.find(1)).toEqual(heroes[0]);
  });
});

describe("update", () => {
  const heroesAndVillains = [{id: 1, name: "Batman"}];
  let model;
  beforeEach(() => {
    model = new Model(JSON.parse(JSON.stringify(heroesAndVillains)));
  });

  test("an entry by id", () => {
    model.update(1, {name: "Joker"});
    expect(model.find(1).name).toBe("Joker");
  });

  test("extend an entry by id", () => {
    model.update(1, {cape: true});
    expect(model.find(1)).toEqual(expect.objectContaining({
      name: "Batman",
      cape: true,
    }));
  });

  test("returns false if no entry matches", () => {
    expect(model.update(2, {})).toBe(false);
  });
});
