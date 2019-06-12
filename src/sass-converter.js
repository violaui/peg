export function sassConverter(sassTypes) {
  return {
    toSassValue
  }

  function toSassValue(v) {
    switch (typeof v) {
      case "string":
        return toString(v)
      case "number":
        return toNumber(v)
      case "boolean":
        return toBoolean(v)
      case "object":
        return toObject(v)
      default:
        return toNull();
    }
  }

  function toObject(v) {
    if (!v)
      return toNull()
    if (v.hasOwnProperty("value") && v.hasOwnProperty("unit")) {
      return toNumber(v.value, v.unit)
    }
    if (Array.isArray(v))
      return toList(v);
    else
      return toMap(v);
  }

  function toString(v) {
    return new sassTypes.String(v);
  }

  function toNumber(v, unit = "") {
    return new sassTypes.Number(v, unit);
  }

  function toBoolean(v) {
    return v ? sassTypes.Boolean.TRUE : sassTypes.Boolean.FALSE;
  }

  function toNull() {
    return sassTypes.Null.NULL;
  }

  function toList(array) {
    let l = new sassTypes.List(array.length)
    array.forEach((e, i) => l.setValue(i, toSassValue(e)))
    return l
  }

  function toMap(obj) {
    let keys = Object.keys(obj)
    let m = new sassTypes.Map(keys.length)
    let values = keys.map(k => obj[k])

    keys.forEach((p, i) => {
      m.setKey(i, toSassValue(p))
      m.setValue(i, toSassValue(values[i]))
    });

    return m
  }
}
