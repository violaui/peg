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

export function createDefinitionData(key, values) {
  let prop = getProp(key)
  let result = {}

  if (Array.isArray(values)) {
    result.bidi = extractValues(prop.valueNames, values);
  } else if (values.hasOwnProperty("ltr") && values.hasOwnProperty("rtl") && !values.rtl) {
    result.bidi = extractValues(prop.valueNames, values.ltr);
  } else if (values.hasOwnProperty("ltr") && values.hasOwnProperty("rtl") && values.ltr && values.rtl) {
    result.ltr = extractValues(prop.valueNames, values.ltr);
    result.rtl = extractValues(prop.valueNames, values.rtl);
  }

  return result

  function extractValues(valueNames, values) {
    let obj = {}
    valueNames.forEach((vn, i) => {
      if (values[i] === 0) {
        obj[vn] = 0
      } else {
        obj[vn] = values[i] || values[values.length - 1]
      }
    })
    return obj
  }
}

function getProp(key) {
  return modules.all.find(p => p.key === key);
}
