import {getRange, getProp} from "./utilities";

export function wrapper({toSassValue}) {
  return {
    'get-range($count, $start-from: 0, $step: 1, $prefix: \"\")': sassGetRange,
    'get-prop($key)': sassGetProp,
  }

  function sassGetRange(count, startFrom = toSassValue(0), step = toSassValue(1), prefix = toSassValue("")) {
    return toSassValue(getRange(count.getValue(), startFrom.getValue(), step.getValue(), prefix.getValue()))
  }

  function sassGetProp(key) {
    return toSassValue(getProp(key.getValue()))
  }
}
