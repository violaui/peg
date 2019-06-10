import * as util from "./utilities";
import {types} from "node-sass";

export function wrapper({toSassValue}) {
  return {
    'get-range($count, $start-from: 0, $step: 1, $prefix: \"\")': sassGetRange,
    'get-prop($key)': sassGetProp,
    'get-prop-with-values($key, $values, $rtl-values: null)': sassGetPropsWithValues,
  }

  function sassGetRange(count, startFrom = toSassValue(0), step = toSassValue(1), prefix = toSassValue("")) {
    return toSassValue(util.getRange(count.getValue(), startFrom.getValue(), step.getValue(), prefix.getValue()))
  }

  function sassGetProp(key) {
    return toSassValue(util.getProp(key.getValue()))
  }

  function sassGetPropsWithValues(key, values, rtlValues = toSassValue(null)) {
    return toSassValue(util.getPropWithValues(key.getValue(), toList(values), toList(rtlValues)))
  }

  function toList(sassList) {
    if (sassList === types.Null.NULL) {
      return null
    }
    let list = [];
    for (let i = 0; i < sassList.getLength(); i++) {
      list.push(sassList.getValue(i).getValue())
    }
    return list;
  }
}
