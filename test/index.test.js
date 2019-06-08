import sass from "node-sass"
import {bow} from "../src/index";
import {converter} from "../src/converter";

let toSass = converter(sass).toSass


test.each([
  [5, 1, 1, "", ["1", "2", "3", "4", "5"]],
  [3, 0, 10, "f", ["f0", "f10", "f20"]],
  [3, 5, 5, "", ["25", "30", "35"]]
])("range($count:%i, $start-from: %i, $step: %i, $prefix: %s)",
  (count, startFrom, step, prefix, expected) => {

    let func = bow(sass)['range($count, $start-from: 0, $step: 1, $prefix: \"\")'];
    let range = func(toSass(count), toSass(startFrom), toSass(step), toSass(prefix))

    expect(range.getLength()).toBe(expected.length)
    expected.forEach((e, i) => {
      expect(range.getValue(i).getValue()).toBe(e)
    })

  })
