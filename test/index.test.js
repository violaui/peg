import {types as t} from "node-sass";
import {peg} from "../src/index";

describe("peg.utilities", () => {
  test('getPropName(key: "-top")', () => {
    let got = peg.utilities.getPropName("-top")
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
      let got = peg.utilities.getStructuredValues(key, values)
      expect(got).toStrictEqual(expected)
    })
})

describe("peg.sassFunctions", () => {
  test.each([
    [3, 1, 1, "-", ["-1", "-2", "-3"]],
    [2, 0, 10, "f", ["f0", "f10"]],
    [3, 5, 5, "", ["25", "30", "35"]],
  ])("get-range($count: %i, $start-from: %i, $step: %i, $prefix: %p)",
    (count, sf, s, p, expected) => {
      let getRange = peg.sassFunctions["get-range($count, $start-from: 0, $step: 1, $prefix: \"\")"]
      let got = getRange(new t.Number(count), new t.Number(sf), new t.Number(s), new t.String(p))

      expect(got.getLength()).toBe(expected.length)
      expected.forEach((e, i) => {
        expect(got.getValue(i).getValue()).toBe(e)
      })
    })

  test('sassGetPropName(key = "width-v")', () => {
    let got = peg.sassFunctions["get-property-name($key)"](new t.String("width-v"))
    expect(got.getValue()).toBe("width")
  })

  test.each([
    ["Typography", peg.sassFunctions["get-typography-keys()"]],
    ["Color", peg.sassFunctions["get-color-keys()"]],
    ["Layout", peg.sassFunctions["get-layout-keys()"]],
    ["Border", peg.sassFunctions["get-border-keys()"]],
    ["Background", peg.sassFunctions["get-background-keys()"]],
    ["Flex", peg.sassFunctions["get-flex-keys()"]],
    ["Grid", peg.sassFunctions["get-grid-keys()"]],
    ["States", peg.sassFunctions["get-states-keys()"]],
    ["Element", peg.sassFunctions["get-element-keys()"]],
  ])('sassGet%sKeys() returns value',
    (_, func) => {
      let got = func()
      expect(got).toBeTruthy()
    })

  test('sassGetStructuredValues(key: "line-height", values: [1, 2])',
    () => {
      let key = "line-height"
      let values = [5, 6]
      let sassValues = new t.List(values.length)
      values.forEach((v, i) => sassValues.setValue(i, new t.Number(v, "rem")))
      let got = peg.sassFunctions["get-structured-values($key, $values)"](new t.String(key), sassValues)

      expect(got.getLength()).toBe(3) // 3 is the length of line-height values
      expect(got.getKey(0).getValue()).toBe("lh1")
      expect(got.getValue(0).getValue()).toBe(5)
      expect(got.getValue(0).getUnit()).toBe("rem")

      expect(got.getKey(1).getValue()).toBe("lh2")
      expect(got.getValue(1).getValue()).toBe(6)
      expect(got.getValue(1).getUnit()).toBe("rem")

      expect(got.getKey(2).getValue()).toBe("lh3")
      expect(got.getValue(2).getValue()).toBe(6)
      expect(got.getValue(1).getUnit()).toBe("rem")
    })
})
