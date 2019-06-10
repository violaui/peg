import {types as t} from "node-sass";
import {bow} from "../src/index";
import {getPropsWithValues} from "../src/utilities";

describe("bow.utilities", () => {
  test.each([
    ["font-size", ["1rem", "2rem", "3rem", "4rem", "5rem", "6rem"], null, {
      default: {
        f1: "1rem",
        f2: "2rem",
        f3: "3rem",
        f4: "4rem",
        f5: "5rem",
        f6: "6rem",
      }
    }],
    ["line-height", [1, 2, 3], [1.5, 2.5, 3.5], {
      default: {lh1: 1, lh2: 2, lh3: 3},
      ltr: {lh1: 1, lh2: 2, lh3: 3},
      rtl: {lh1: 1.5, lh2: 2.5, lh3: 3.5}
    }],
    ["line-height", [1, 2 ], [1.5], {
      default: {lh1: 1, lh2: 2, lh3: 2},
      ltr: {lh1: 1, lh2: 2, lh3: 2},
      rtl: {lh1: 1.5, lh2: 1.5, lh3: 1.5}
    }]
  ])("getPropsWithValues(%p, %p, %p)",
    (key, values, rtlValues, expected) => {
      let got = getPropsWithValues(key, values, rtlValues)
      expect(got).toEqual(expected)
    })
})

describe("bow.sassFunctions", () => {
  test.each([
    [3, 1, 1, "-", ["-1", "-2", "-3"]],
    [2, 0, 10, "f", ["f0", "f10"]],
    [3, 5, 5, "", ["25", "30", "35"]],
  ])("get-range($count: %i, $start-from: %i, $step: %i, $prefix: %p)",
    (count, sf, s, p, expected) => {
      let getRange = bow.sassFunctions['get-range($count, $start-from: 0, $step: 1, $prefix: \"\")']
      let got = getRange(new t.Number(count), new t.Number(sf), new t.Number(s), new t.String(p))

      expect(got.getLength()).toBe(expected.length)
      expected.forEach((e, i) => {
        expect(got.getValue(i).getValue()).toBe(e)
      })
    })
})
