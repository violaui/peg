export function converter(sassTypes) {
  return {
    toSass
  }

  function toSass(v) {
    switch (typeof v) {
      case "string":
        return new sassTypes.String(v);
      case "number":
        return new sassTypes.Number(v);
      case "boolean":
        return v ? sassTypes.Boolean.TRUE : sassTypes.Boolean.FALSE;
      case "object":
        return toMap(v);
      default:
        return sassTypes.Null.NULL;
    }
  }

  function toMap(obj) {
    if (!obj)
      return sassTypes.Null.NULL;

    let keys = Object.keys(obj),
      m = new sassTypes.Map(keys.length),
      values = keys.map(k => obj[k]);

    keys.forEach((p, i) => {
      m.setKey(i, toSass(p))
      m.setValue(i, toSass(values[i]))
    });

    return m
  }
}
