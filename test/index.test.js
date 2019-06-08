import {types} from "node-sass"
import {bow} from "../src/index";
import {converter} from "../src/converter";

let toSass = converter(types).toSass

test.each([
  [5, 1, 1, "", ["1", "2", "3", "4", "5"]],
  [3, 0, 10, "f", ["f0", "f10", "f20"]],
  [3, 5, 5, "", ["25", "30", "35"]]
])("range($count: %i, $start-from: %i, $step: %i, $prefix: %p)",
  (count, startFrom, step, prefix, expected) => {
    let func = bow(types)['range($count, $start-from: 0, $step: 1, $prefix: \"\")'],
      range = func(toSass(count), toSass(startFrom), toSass(step), toSass(prefix))

    expect(range.getLength()).toBe(expected.length)
    expected.forEach((e, i) => {
      expect(range.getValue(i).getValue()).toBe(e)
    })
  })
test.each([
  ["font-size", {key: "font-size", prop: "font-size", prefix: "f"}],
  ["not-exists", null]
])("get-prop($key: %p)",
  (key, expected) => {
    let func = bow(types)["get-prop($key)"],
      prop = func(toSass(key));

    if (!expected) {
      expect(prop).toBe(types.Null.NULL)
    } else {
      Object.keys(expected).forEach((k, i) => {
        expect(prop.getKey(i).getValue()).toBe(k)
        expect(prop.getValue(i).getValue()).toBe(expected[k])
      })
    }
  })
