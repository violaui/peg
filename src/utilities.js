import {properties} from "./modules";

export function getRange(count, startFrom = 0, step = 1, prefix = "") {
  return [...Array(count).keys()]
    .map(i => (i + startFrom) * step)
    .map(e => `${prefix}${e}`)
}

export function getProp(key) {
  return properties.find(p => p.key === key)
}

export function getPropWithValues(key, values, rtlValues = null) {
  let prop = getProp(key)
  let obj = {default: {}}

  if (!prop) {
    return null
  }
  if (!values || !values.length) {
    return null
  }

  if (rtlValues && rtlValues.length) {
    obj.ltr = {}
    obj.rtl = {}
  }

  prop.valueNames.forEach((n, i) => {
    obj.default[n] = values[i] || values[values.length - 1]

    if (obj.ltr && obj.rtl) {
      obj.ltr[n] = values[i] || values[values.length - 1]
      obj.rtl[n] = rtlValues[i] || rtlValues[rtlValues.length - 1]
    }
  })
  return obj
}
