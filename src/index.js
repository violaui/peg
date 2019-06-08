import {allProps} from "./modules";
import {converter} from "./converter";

export function bow(sass) {
  let c = converter(sass)
  return {
    'range($count, $start-from: 0, $step: 1, $prefix: \"\")': range,
    'get-prop($key)': getProp,
  }

  function range(count, startFrom = 0, step = 1, prefix = "") {
    let c = count.getValue(),
      sf = startFrom.getValue(),
      s = step.getValue(),
      p = prefix.getValue();

    let l = new sass.types.List(c);
    [...Array(c).keys()]
      .map(i => (i + sf) * s)
      .map(e => `${p}${e.toString()}`)
      .map((e, i) => l.setValue(i, new sass.types.String(e)))

    return l;
  }

  function getProp(key) {
    // key = key.getValue();
    console.log(key)
    let prop = allProps.find(p => p.key === key);

    if (!prop) return c.toSass(null)

    let keys = Object.keys(prop).length,
      map = new sass.types.Map(keys.length),
      val = keys.map(k => prop[k]);

    console.log(val)

    keys.forEach((p, i) => {
      map.setKey(i, c.toSass(p))
      map.setValue(i, c.toSass(val[i]))
    });

    return map;
  }
}
