import * as modules from "./modules";

export function getRange(count, startFrom = 0, step = 1, prefix = "") {
  return [...Array(count).keys()]
    .map(i => (i + startFrom) * step)
    .map(e => `${prefix}${e}`)
}

export function getPropName(key) {
  let prop = getProp(key)
  return prop && prop.prop
}

export function getStructuredValues(key, values) {
  let prop = getProp(key)
  let obj = {}

  if (!prop) {
    return null
  }
  if (!values || !values.length) {
    return null
  }

  prop.valueNames.forEach((n, i) => {
    obj[n] = values[i] || values[values.length - 1]
  })

  return obj
}

function getProp(key) {
  return modules.all.find(p => p.key === key);
}
