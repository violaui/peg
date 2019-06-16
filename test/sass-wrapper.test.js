import {peg} from "../src";
import {types as t} from "node-sass";

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

  test("sassGetPropName(key = \"width-v\")", () => {
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
  ])("sassGet%sKeys() returns value",
    (_, func) => {
      let got = func()
      expect(got).toBeTruthy()
    })

  test("sassCreateDefinitionData(key = line-height, values=[1.2, 1.8, 2])", () => {
    const key = new t.String("line-height")
    const values = [1.2, 1.8, 2].reduce((list, c, i) => {
      list.setValue(i, new t.Number(c))
      return list
    }, new t.List(3))

    let got = peg.sassFunctions["create-definition-data($key, $values)"](key, values)
    expect(got.constructor.name).toBe("SassMap")
    expect(got.getKey(0).getValue()).toBe("bidi")
    expect(got.getValue(0).constructor.name).toBe("SassMap")
    expect(got.getValue(0).getKey(0).getValue()).toBe("lh1")
    expect(got.getValue(0).getValue(0).getValue()).toBe(1.2)
    expect(got.getValue(0).getKey(1).getValue()).toBe("lh2")
    expect(got.getValue(0).getValue(1).getValue()).toBe(1.8)
    expect(got.getValue(0).getKey(2).getValue()).toBe("lh3")
    expect(got.getValue(0).getValue(2).getValue()).toBe(2)

  })
})
