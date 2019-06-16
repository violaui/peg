import * as utilities from "../src/utilities"

describe("utilities.getPropName", () => {
  test.each([
    ["-top", "top"],
    ["not-exists", null],
    ["-start", {ltr: "left", rtl: "right"}],
  ])('given key: %p should return %p")', (key, expected) => {
    let got = utilities.getPropName(key)
    expect(got).toStrictEqual(expected)
  })
})

describe("utilities.getStructuredValues", () => {
  test.each([
    ["font-size",
      ["1rem", "2rem", "3rem", "4rem", "5rem", "6rem"], {
      f1: "1rem",
      f2: "2rem",
      f3: "3rem",
      f4: "4rem",
      f5: "5rem",
      f6: "6rem"
    }],
    ["line-height", [1, 2], {lh1: 1, lh2: 2, lh3: 2}],
    ["line-height", {ltr: [1, 2, 3], rtl: [1.3, 2.1]}, {
      ltr: {lh1: 1, lh2: 2, lh3: 3},
      rtl: {lh1: 1.3, lh2: 2.1, lh3: 3}
    }],
    ["not-exists", [1, 2, 3], null],
    ["font-size", 3, null],
    ["font-size", null, null],
    ["primary-font", {ltr: ["arial", "sans"], rtl: ["tahoma", "sans-serif"]},
      {primary: {ltr: ["arial", "sans"], rtl: ["tahoma", "sans-serif"]}}]
  ])("given key: %p and values : %p should return %p",
    (key, values, expected) => {
      let got = utilities.getStructuredValues(key, values)
      expect(got).toStrictEqual(expected)
    })
})
