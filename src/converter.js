export function converter(sass) {
  return {
    toSass
  }

  function toSass(v) {
    switch (typeof v) {
      case "string":
        return new sass.types.String(v);
      case "number":
        return new sass.types.Number(v);
      case "boolean":
        return v ? sass.types.Boolean.TRUE : sass.types.Boolean.FALSE;
      default:
        return sass.types.Null.NULL;
    }
  }
}
