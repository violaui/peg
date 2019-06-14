import * as modules from "./modules";

export function getRange(count, startFrom = 0, step = 1, prefix = "") {
  return [...Array(count).keys()]
    .map(i => (i + startFrom) * step)
    .map(e => `${prefix}${e}`)
}

export function getPropName(key) {
  let prop = getProp(key)
  if (!prop) {
    return null
  }
  return prop.prop
}


export function getStructuredValues(key, values) {
  let prop = getProp(key)

  if (!prop || !values || !Object.keys(values).length) {
    return null
  }

  if (values.hasOwnProperty("ltr") && values.hasOwnProperty("rtl")) {
    return createObjectValue(prop, values);
  }
  return createArrayValue(prop, values);
}

function getProp(key) {
  return modules.all.find(p => p.key === key);
}

function createObjectValue(prop, values) {
  let obj = {ltr: {}, rtl: {}}
  prop.valueNames.forEach((n, i) => {
    obj.ltr[n] = values.ltr[i] || values.ltr[values.ltr.length - 1]
    obj.rtl[n] = values.rtl[i] || values.ltr[values.ltr.length - 1]
  })

  return obj
}

function createArrayValue(prop, values) {
  let obj = {}
  prop.valueNames.forEach((n, i) => {
    obj[n] = values[i] || values[values.length - 1]
  })
  return obj
}
