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
    if (isNumber(value)) {
      return toNumber(value.value, value.unit)
    }

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

  function isNumber(value) {
    return Object.keys(value).length === 2 &&
      value.hasOwnProperty("value") &&
      value.hasOwnProperty("unit");
  }
}

function toJs() {
  return function (sassValue) {
    return toJsValue(sassValue)
  }

  function toJsValue(sassValue) {
    switch (sassValue.constructor.name) {
      case "SassNumber":
        return toNumber(sassValue)
      case "SassString":
        return toString(sassValue)
      case "SassColor":
        return toColor(sassValue)
      case "SassBoolean":
        return toBoolean(sassValue)
      case "SassList":
        return toArray(sassValue)
      case "SassMap":
        return toObject(sassValue)
      case "SassNull":
        return null
    }
  }

  function toNumber(value) {
    if (value.getUnit()) {
      return {value: value.getValue(), unit: value.getUnit()}
    }
    return value.getValue()
  }

  function toString(value) {
    return value.getValue()
      .replace(/^"/, "")
      .replace(/"$/, "")
  }

  function toColor(value) {
    return {
      red: value.getR(),
      green: value.getG(),
      blue: value.getB(),
      alpha: value.getA(),
    }
  }

  function toBoolean(value) {
    return value === sassTypes.Boolean.TRUE
  }

  function toArray(value) {
    return [...Array(value.getLength()).keys()]
      .map(i => toJsValue(value.getValue(i)))
  }

  function toObject(value) {
    return [...Array(value.getLength()).keys()]
      .reduce((obj, _, i) => {
        obj[value.getKey(i).getValue()] = toJsValue(value.getValue(i))
        return obj
      }, {})
  }

}
