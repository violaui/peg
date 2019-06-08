import {allProps} from "./modules";
import {converter} from "./converter";

export function bow(sassTypes) {
  let conv = converter(sassTypes)
  return {
    'range($count, $start-from: 0, $step: 1, $prefix: \"\")': range,
    'get-prop($key)': getProp,
  }

  function range(count, startFrom = 0, step = 1, prefix = "") {
    const c = count.getValue(),
      sf = startFrom.getValue(),
      s = step.getValue(),
      p = prefix.getValue();

    let l = new sassTypes.List(c);
    [...Array(c).keys()]
      .map(i => (i + sf) * s)
      .map(e => `${p}${e.toString()}`)
      .map((e, i) => l.setValue(i, new sassTypes.String(e)))

    return l;
  }

  function getProp(key) {
    const k = key.getValue(),
      prop = allProps.find(p => p.key === k);

    return conv.toSass(prop);
  }
}
