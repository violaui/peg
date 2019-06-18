import {convert} from "../src/converters";
import {types} from "node-sass";

describe("convert.toSass", () => {
  test("should convert the given number to SASS number", () => {
    const value = 42
    const got = convert.toSASS(value)
    expect(got.getValue()).toBe(value)
  })

  test("should convert the given number and unit to SASS number", () => {
    const value = 42
    const unit = "vh"
    const got = convert.toSASS(value, unit)
    expect(got.getValue()).toBe(value)
    expect(got.getUnit()).toBe(unit)
  })

  test.each([
    ["dummy", "dummy"],
    ["dummy string", "\"dummy string\""],
    ["another dummy string", "\"another dummy string\""]
  ])("should convert %p string to SASS string", (value, expected) => {
    const got = convert.toSASS(value)
    expect(got.getValue()).toBe(expected)
  })

  test.each([
    [true, types.Boolean.TRUE],
    [false, types.Boolean.FALSE],
  ])("should convert [%p] to SASS boolean", (value, expected) => {
    const got = convert.toSASS(value)
    expect(got).toBe(expected)
  })

  test.each([
    [[1, 2, 3], [1, 2, 3]],
    [["a", "b", "c d"], ["a", "b", "\"c d\""]],
    [[1, true], [1, true]],
  ])("should convert %p to SASS List", (array, expected) => {
    const got = convert.toSASS(array)
    expect(got.getLength()).toBe(array.length)

    let items = [...Array(got.getLength()).keys()]
      .map(i => got.getValue(i).getValue())

    expect(items).toEqual(expect.arrayContaining(expected))
  })

  test.each([
    [null, types.Null.NULL],
    [undefined, types.Null.NULL],
  ])("should convert %p to SASS NULL type", (value, expected) => {
    const got = convert.toSASS(value)
    expect(got).toBe(expected)
  })

  test.each([
    [{}, new types.Map(0)],
    [{name: "name"}, new types.Map(1)],
    [{name: "name", age: 3}, new types.Map(2)],
    [{name: "name", age: 3, items: [1, "a", false]}, new types.Map(3)],
    [{name: "name", age: 3, hair: {color: "brown", bald: false}}, new types.Map(3)],
  ])("should convert %p to SASS Map", (value, expected) => {
    const got = convert.toSASS(value)
    expect(got.getLength()).toEqual(expected.getLength());

    let obj = {};
    [...Array(got.getLength())].forEach((_, i) => {
      const key = got.getKey(i).getValue()
      if (got.getValue(i).getKey) {
        obj[key] = {}
        for (let j = 0; j < got.getValue(i).getLength(); j++) {
          obj[key][got.getValue(i).getKey(j).getValue()] = got.getValue(i).getValue(j).getValue()
        }
      } else if (got.getValue(i).getSeparator) {
        obj[key] = []
        for (let j = 0; j < got.getValue(i).getLength(); j++) {
          obj[key].push(got.getValue(i).getValue(j).getValue())
        }
      } else {
        obj[key] = got.getValue(i).getValue()
      }
    })

    expect(obj).toStrictEqual(value)
  })

  test("should convert special JS object {value:..., unit:...} to SASS Number", () => {
    const value = {value: 42, unit: "rem"}
    const got = convert.toSASS(value)

    expect(got.getValue()).toBe(42)
    expect(got.getUnit()).toBe("rem")

  })

  test("should convert special JS object {red:..., green:..., blue:..., alpha:...} to SASS Color", () => {
    const value = {red: 100, green: 150, blue: 200, alpha: .7}
    const got = convert.toSASS(value)

    expect(got.constructor.name).toBe("SassColor")
    expect(got.getR()).toBe(100)
    expect(got.getG()).toBe(150)
    expect(got.getB()).toBe(200)
    expect(got.getA()).toBe(.7)
  })

})
describe("convert.toJs", () => {
  test("should convert the given SASS Number to JS number", () => {
    const value = new types.Number(42)
    const got = convert.toJS(value)
    expect(got).toBe(value.getValue())
  })

  test("should convert the given SASS Number with unit to JS Object", () => {
    const value = new types.Number(42, "rem")
    const got = convert.toJS(value)
    expect(got).toStrictEqual({value: 42, unit: "rem"})
  })

  test.each([
    [new types.String("dummy"), "dummy"],
    [new types.String("\"dummy string\""), "dummy string"],
  ])("should convert SASS String%p to JS string %p", (value, expected) => {
    const got = convert.toJS(value)
    expect(got).toBe(expected)
  })

  test.each([
    [types.Boolean.TRUE, true],
    [types.Boolean.FALSE, false],
  ])("should convert SASS Boolean %p to JS %p", (value, expected) => {
    const got = convert.toJS(value)
    expect(got).toBe(expected)
  })

  test.each([
    [new types.Color(10, 20, 30), {red: 10, green: 20, blue: 30, alpha: 1}],
    [new types.Color(10, 20, 30, .2), {red: 10, green: 20, blue: 30, alpha: .2}],
  ])("should convert SASS Color%P to JS Object %p", (value, expected) => {
    const got = convert.toJS(value)
    expect(got).toStrictEqual(expected)
  })

  test("should convert SASS NULL to null", () => {
    const got = convert.toJS(types.Null.NULL)
    expect(got).toBeNull()
  })

  test.each([
    [[1, 2, 3].reduce((list, v, i) => {
      list.setValue(i, new types.Number(v))
      return list
    }, new types.List(3)), [1, 2, 3]],
  ])
  ("should convert SASS List%p to JS %p", (value, expected) => {
    const got = convert.toJS(value)
    expect(got).toStrictEqual(expected)
  })

  test("should convert complex SASS List to JS Array", () => {
    const expected = [1, ["a", "b"], {red: 0, green: 0, blue: 0, alpha: 1}]
    let list = new types.List(3)
    let innerList = new types.List(2)

    list.setValue(0, new types.Number(1))
    list.setValue(1, new types.List(2))
    innerList.setValue(0, new types.String("a"))
    innerList.setValue(1, new types.String("b"))
    list.setValue(1, innerList)
    list.setValue(2, new types.Color(0, 0, 0, 1))

    const got = convert.toJS(list)
    expect(got).toStrictEqual(expected)
  })

  test("should convert SASS Map to JS object", () => {
    const expected = {name: "name", age: "3"}
    const map = Object.keys(expected).reduce((map, v, i) => {
      map.setKey(i, new types.String(v))
      map.setValue(i, new types.String(expected[v]))
      return map
    }, new types.Map(2))
    const got = convert.toJS(map)
    expect(got).toStrictEqual(expected)
  })

  test("should convert complex SASS Map to JS object", () => {
    const expected = {name: "name", age: 3, hair: {color: "red"}, lang: ["en", "fr"]}
    const map = new types.Map(4)

    map.setKey(0, new types.String("name"))
    map.setValue(0, new types.String("name"))

    map.setKey(1, new types.String("age"))
    map.setValue(1, new types.Number(3))

    let hair = new types.Map(1)
    hair.setKey(0, new types.String("color"))
    hair.setValue(0, new types.String("red"))
    map.setKey(2, new types.String("hair"))
    map.setValue(2, hair)

    let lang = new types.List(2)
    lang.setValue(0, new types.String("en"))
    lang.setValue(1, new types.String("fr"))
    map.setKey(3, new types.String("lang"))
    map.setValue(3, lang)

    const got = convert.toJS(map)
    expect(got).toStrictEqual(expected)
  })

})
