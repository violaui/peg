import {types as t} from "node-sass";
import {bow} from "../src/index";
import {layout} from "../src/modules";

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
  test("temp", () => {
    let starts = layout.filter(p => p.key.includes("start")).map(p => {
      p.prop = {default: "left", rtl: "right", lrt: "left"}
      return p
    })

    console.log(starts)
  })
})
