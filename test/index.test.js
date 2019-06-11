import {types as t} from "node-sass";
import {bow} from "../src/index";

describe("bow.utilities", () => {
  test('getPropName(key: "-top")', () => {
    let got = bow.utilities.getPropName("-top")
    expect(got).toBe("top")
  })

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

  ])("getStructuredValues(key = %p, values = %p)",
    (key, values, expected) => {
      let got = bow.utilities.getStructuredValues(key, values)
      expect(got).toStrictEqual(expected)
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

  test('sassGetPropName(key = "width-v")', () => {
    let got = bow.sassFunctions["get-property-name($key)"](new t.String("width-v"))
    expect(got.getValue()).toBe("width")
  })

  test.each([
    ["Typography", bow.sassFunctions["get-typography-keys()"]],
    ["Color", bow.sassFunctions["get-color-keys()"]],
    ["Layout", bow.sassFunctions["get-layout-keys()"]],
    ["Border", bow.sassFunctions["get-border-keys()"]],
    ["Background", bow.sassFunctions["get-background-keys()"]],
    ["Flex", bow.sassFunctions["get-flex-keys()"]],
    ["Grid", bow.sassFunctions["get-grid-keys()"]],
    ["States", bow.sassFunctions["get-states-keys()"]],
    ["Element", bow.sassFunctions["get-element-keys()"]],
  ])('sassGet%sKeys() returns value',
    (_, func) => {
      let got = func()
      expect(got).toBeTruthy()
    })

  //["line-height", [1, 2], {lh1: 1, lh2: 2, lh3: 2}],
  test('sassGetStructuredValues(key: "line-height", values: [1, 2])',
    () => {
      let key = "line-height"
      let values = [5, 6]
      let sassValues = new t.List(values.length)
      values.forEach((v, i) => sassValues.setValue(i, new t.Number(v)))
      let got = bow.sassFunctions["get-structured-values($key, $values)"](new t.String(key), sassValues)

      expect(got.getLength()).toBe(3) // 3 is the length of line-height values
      expect(got.getKey(0).getValue()).toBe("lh1")
      expect(got.getValue(0).getValue()).toBe(5)

      expect(got.getKey(1).getValue()).toBe("lh2")
      expect(got.getValue(1).getValue()).toBe(6)

      expect(got.getKey(2).getValue()).toBe("lh3")
      expect(got.getValue(2).getValue()).toBe(6)
    })
})
