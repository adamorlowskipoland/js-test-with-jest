describe("splice does modify original data", () => {
  let data;

  beforeEach(() => {
    data = ["Darth Vader", "Yoda", "Luke"];
  });

  test("after splice first elem original data will be modified", () => {
    const first = data.splice(0, 1);
    expect(data.length).toBe(2);
    expect(first.length).toBe(1);
    expect(first[0]).toBe("Darth Vader");
    expect(data[0]).toBe("Yoda");
  });

  test("after inserting elem at index 1 original data will be modified", () => {
    data.splice(1, 0, "Solo");
    expect(data[1]).toBe("Solo");
    expect(data.length).toBe(4);
  });

  test("after splicing 2 elems from last with new elems, original data will be modified", () => {
    const lastTwo = data.splice(-2, 2, "Solo", "Leia");
    console.log(lastTwo)

    expect(data[1]).toBe("Solo");
    expect(data.length).toBe(3);

    expect(lastTwo.length).toBe(2);
    expect(lastTwo).toEqual(["Yoda", "Luke"]);
  });
});

describe("slice does not modify original data ", () => {
  let data;

  beforeEach(() => {
    data = ["Darth Vader", "Yoda", "Luke"];
  });

  test("after slice first elem original data will be intact", () => {
    const first = data.slice(0, 1);
    expect(data.length).toBe(3);
    expect(first.length).toBe(1);
    expect(data[0]).toBe("Darth Vader");
    expect(first[0]).toBe("Darth Vader");
  });

  test("after inserting elem at index 1 original data will be intact", () => {
    const extendedData = [...data.slice(0, 1), "Solo", ...data.slice(1)];
    expect(data[1]).toBe("Yoda");
    expect(extendedData[1]).toBe("Solo");
    expect(data.length).toBe(3);
    expect(extendedData.length).toBe(4);
  });

  test("sliced last elem/s returns new array leaving original data intact", () => {
    const last = data.slice(-1);
    const lastTwo = data.slice(-2);

    expect(data.length).toBe(3);

    expect(last.length).toBe(1);
    expect(last[0]).toBe("Luke");

    expect(lastTwo.length).toBe(2);
    expect(lastTwo).toEqual(["Yoda", "Luke"]);
  });

});
