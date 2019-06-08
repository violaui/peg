export function sassHelper(sassTypes) {
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
        return handlerObject(v)
      default:
        return toNull();
    }
  }

  function handlerObject(v) {
    if (!v)
      return toNull()
    if (Array.isArray(v))
      return toList(v);
    else
      return toMap(v);
  }

  function toString(v) {
    return new sassTypes.String(v);
  }

  function toNumber(v) {
    return new sassTypes.Number(v);
  }

  function toBoolean(v) {
    return v ? sassTypes.Boolean.TRUE : sassTypes.Boolean.FALSE;
  }

  function toNull() {
    return sassTypes.Null.NULL;
  }

  function toMap(obj) {
    let keys = Object.keys(obj),
      m = new sassTypes.Map(keys.length),
      values = keys.map(k => obj[k]);

    keys.forEach((p, i) => {
      m.setKey(i, toSassValue(p))
      m.setValue(i, toSassValue(values[i]))
    });

    return m
  }

  function toList(array) {
    let l = new sassTypes.List(array.length)
    array.forEach((e, i) => {
      l.setValue(i, toSassValue(e))
    })

    return l
  }
}
