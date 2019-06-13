import {types as sassTypes} from "node-sass";

export const convert = {
  toSASS: toSass(sassTypes),
  toJS: toJs(),
}

function toSass(t) {
  return function (jsValue, unit = "") {
    return toSassValue(jsValue, unit)
  }

  function toSassValue(jsValue, unit = "") {
    switch (typeof jsValue) {
      case "number":
        return toNumber(jsValue, unit)
      case "string":
        return toString(jsValue)
      case "boolean":
        return toBoolean(jsValue)
      case "object":
        if (!jsValue) {
          return toNull()
        } else if (Array.isArray(jsValue)) {
          return toList(jsValue)
        } else {
          return toMap(jsValue)
        }
      case "undefined":
        return toNull()
    }
  }

  function toNumber(value, unit) {
    return new t.Number(value, unit ? unit : "")
  }

  function toString(value) {
    if (value.includes(" ")) {
      return new t.String(`"${value}"`)
    }
    return new t.String(value)
  }

  function toBoolean(value) {
    return value ? t.Boolean.TRUE : t.Boolean.FALSE
  }

  function toList(value) {
    let list = new t.List(value.length)
    value.map((v, i) => list.setValue(i, toSassValue(v)))
    return list
  }

  function toMap(value) {
    let map = new t.Map(Object.keys(value).length)
    Object.keys(value)
      .map((k, i) => {
        map.setKey(i, toString(k))
        map.setValue(i, toSassValue(value[k]))
      })
    return map
  }

  function toNull() {
    return t.Null.NULL
  }
}

function toJs() {
  return function (sassValue) {
    const type = getTypeOfSassValue(sassValue)
    switch (type) {
      case "number":
      case "string":
      case "color":
      case "boolean":
      case "list":
      case "map":
      case "null":
      default:
    }
  }

  function getTypeOfSassValue() {

  }

  function toNumber(value) {

  }

  function toString(value) {

  }

  function toBoolean(value) {

  }

  function toArray(value) {

  }

  function toObject(value) {

  }
}
