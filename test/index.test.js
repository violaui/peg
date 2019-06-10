import {types as t} from "node-sass";
import {bow} from "../src/index";
import {getPropWithValues} from "../src/utilities";

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
    ["line-height", [1, 2], [1.5], {
      default: {lh1: 1, lh2: 2, lh3: 2},
      ltr: {lh1: 1, lh2: 2, lh3: 2},
      rtl: {lh1: 1.5, lh2: 1.5, lh3: 1.5}
    }]
  ])("getPropWithValues(%p, %p, %p)",
    (key, values, rtlValues, expected) => {
      let got = getPropWithValues(key, values, rtlValues)
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

  test('getPropWithValues($key: "font-style", $values: ["i"], $rtl-values: null)', () => {

    let func = bow.sassFunctions["get-prop-with-values($key, $values, $rtl-values: null)"]

    function toSassList(list) {
      if (!list) {
        return t.Null.NULL
      }
      let sl = new t.List(list.length)
      for (let i = 0; i < list.length; i++) {
        sl.setValue(i, new t.String(list[i]))
      }
      return sl;
    }

    let values = ["italic"]
    let got = func(new t.String("font-style"), toSassList(values), t.Null.NULL)

    expect(got.getLength()).toBe(values.length)
    expect(got.getKey(0).getValue()).toBe("default")
    expect(got.getValue(0).getKey(0).getValue()).toBe("i")
    expect(got.getValue(0).getValue(0).getValue()).toBe("italic")
  })
})
