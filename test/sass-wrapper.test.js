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

  test("sassGetStructuredValues(key: \"line-height\", values: [1, 2])",
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

  test("sassGetStructuredValues(key: \"font-family\", values:(ltr:(arial sans-serif, times sans, \"segoe ui\", monospace), rtl:tahoma))",
    () => {
      let key = "font-family"
      let values = {ltr: [["arial", "sans-serif"], ["times", "sans"], "segoe ui", "monospace"], rtl: ["tahoma"]}
      let sassValues = new t.Map(2)
      Object.keys(values).forEach((key, i) => sassValues.setKey(i, new t.String(key)))
      Object.keys(values).forEach((key, i) => {
        let val = values[key]
        switch (typeof val) {
          case "string":
            sassValues.setValue(i, new t.String(val))
            break;
          case "object":
            if (Array.isArray(val)) {
              let list = new t.List(val.length)
              val.forEach((v, i) => {
                if (Array.isArray(v)) {
                  let innerList = new t.List(v.length)
                  v.forEach((v, i) => {
                    innerList.setValue(i, new t.String(v))
                  })
                  list.setValue(i, innerList)
                } else {
                  list.setValue(i, new t.String(v))
                }
              })
              sassValues.setValue(i, list)
            }
        }
      })


      let got = peg.sassFunctions["get-structured-values($key, $values)"](new t.String(key), sassValues)
      expect(got.constructor.name).toBe("SassMap")
      expect(got.getLength()).toBe(2)
      expect(got.getKey(0).getValue()).toBe("ltr")
      expect(got.getKey(1).getValue()).toBe("rtl")

      expect(got.getValue(0).constructor.name).toBe("SassMap")
      expect(got.getValue(1).constructor.name).toBe("SassMap")

      expect(got.getValue(0).getKey(0).getValue()).toBe("primary")
      expect(got.getValue(0).getKey(1).getValue()).toBe("secondary")
      expect(got.getValue(0).getKey(2).getValue()).toBe("tertiary")
      expect(got.getValue(0).getKey(3).getValue()).toBe("code")

      expect(got.getValue(1).getKey(0).getValue()).toBe("primary")
      expect(got.getValue(1).getKey(1).getValue()).toBe("secondary")
      expect(got.getValue(1).getKey(2).getValue()).toBe("tertiary")
      expect(got.getValue(1).getKey(3).getValue()).toBe("code")


      expect(got.getValue(0).getValue(0).constructor.name).toBe("SassList")
      expect(got.getValue(0).getValue(0).getSeparator()).toBe(false)
      expect(got.getValue(0).getValue(0).getValue(0).getValue()).toBe("arial")
      expect(got.getValue(0).getValue(0).getValue(1).getValue()).toBe("sans-serif")
      expect(got.getValue(0).getValue(1).getSeparator()).toBe(false)
      expect(got.getValue(0).getValue(1).getValue(0).getValue()).toBe("times")
      expect(got.getValue(0).getValue(1).getValue(1).getValue()).toBe("sans")
      expect(got.getValue(0).getValue(2).constructor.name).toBe("SassString")
      expect(got.getValue(0).getValue(2).getValue()).toBe("\"segoe ui\"")
      expect(got.getValue(0).getValue(3).constructor.name).toBe("SassString")
      expect(got.getValue(0).getValue(3).getValue()).toBe("monospace")

      expect(got.getValue(1).getValue(0).constructor.name).toBe("SassString")
      expect(got.getValue(1).getValue(0).getValue()).toBe("tahoma")
      expect(got.getValue(1).getValue(1).constructor.name).toBe("SassString")
      expect(got.getValue(1).getValue(1).getValue()).toBe("monospace")
      expect(got.getValue(1).getValue(2).constructor.name).toBe("SassString")
      expect(got.getValue(1).getValue(2).getValue()).toBe("monospace")
      expect(got.getValue(1).getValue(3).constructor.name).toBe("SassString")
      expect(got.getValue(1).getValue(3).getValue()).toBe("monospace")

      //(
      // ltr: (primary: arial sans-serif, secondary: times sans, tertiary: "segoe ui", code: times sans),
      // rtl: (primary: Iranyekan, secondary: times sans, tertiary: times sans, code: times sans)
      // )


    })
})
