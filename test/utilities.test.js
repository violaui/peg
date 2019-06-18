import * as utilities from "../src/utilities"

describe("utilities.getPropName", () => {
  test.each([
    ["-top", "top"],
    ["not-exists", null],
    ["-start", {ltr: "left", rtl: "right"}],
  ])("given key: %p should return %p\")", (key, expected) => {
    let got = utilities.getPropName(key)
    expect(got).toStrictEqual(expected)
  })
})

describe("utilities.createDefinitionData", () => {
  test("given key: font-size, values as an array should return {bidi:{...}}", () => {
    const key = "font-size";
    const values = [{value: 1, unit: "rem"}, {value: 2, unit: "rem"}, {value: 30, unit: "px"}]
    const expected = {
      bidi: {
        f1: {value: 1, unit: "rem"},
        f2: {value: 2, unit: "rem"},
        f3: {value: 30, unit: "px"},
        f4: {value: 30, unit: "px"},
        f5: {value: 30, unit: "px"},
        f6: {value: 30, unit: "px"}
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given key: font-size, values as an object should return {ltr:{...}, rtl:{...}}", () => {
    const key = "font-size"
    const values = {
      ltr: [{value: 1, unit: "rem"}, {value: 2, unit: "rem"}, {value: 30, unit: "px"}],
      rtl: [{value: 1.2, unit: "rem"}, {value: 2.5, unit: "rem"}, {value: 3, unit: "rem"}, {value: 4.3, unit: "rem"}],
    }
    const expected = {
      ltr: {
        f1: {value: 1, unit: "rem"},
        f2: {value: 2, unit: "rem"},
        f3: {value: 30, unit: "px"},
        f4: {value: 30, unit: "px"},
        f5: {value: 30, unit: "px"},
        f6: {value: 30, unit: "px"}
      },
      rtl: {
        f1: {value: 1.2, unit: "rem"},
        f2: {value: 2.5, unit: "rem"},
        f3: {value: 3, unit: "rem"},
        f4: {value: 4.3, unit: "rem"},
        f5: {value: 4.3, unit: "rem"},
        f6: {value: 4.3, unit: "rem"}
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given key: primary-font, values as an array should return {bidi: {primary: [...]}}", () => {
    const key = "primary-font"
    const values = [["arial", "helvetica", "sans"]]
    const expected = {
      bidi: {
        primary: ["arial", "helvetica", "sans"]
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given key: primary-font, values as an object should return {ltr: {primary: [...]}, rtl: {primary: [...]}}", () => {
    const key = "primary-font"
    const values = {ltr: [["arial", "helvetica", "sans"]], rtl: [["tahoma", "times", "sans-serif"]]}
    const expected = {
      ltr: {
        primary: ["arial", "helvetica", "sans"]
      },
      rtl: {
        primary: ["tahoma", "times", "sans-serif"]
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given key: primary-font, values as an string should return {ltr: {primary: \"...\"}, rtl: {primary: \"...\"}}", () => {
    const key = "primary-font"
    const values = {ltr: ["arial"], rtl: ["tahoma"]}
    const expected = {
      ltr: {
        primary: "arial"
      },
      rtl: {
        primary: "tahoma"
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given key: text-align, values as an array should return {bidi:{tl:\"...\", ...}}", () => {
    const key = "text-align"
    const values = ["left", "right", "center", "justify", {ltr: "left", rtl: "right"}, {ltr: "right", rtl: "left"}]
    const expected = {
      bidi: {
        tl: "left",
        tr: "right",
        tc: "center",
        tj: "justify",
        ts: {ltr: "left", rtl: "right"},
        te: {ltr: "right", rtl: "left"},
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given key: padding-start (complex prop), values as an array should return {bidi:{...}}", () => {
    const key = "padding-start"
    const values = [
      0, {value: 1, unit: "rem"}, {value: 1.8, unit: "rem"}, {value: 2.4, unit: "rem"}
    ]
    const expected = {
      bidi: {
        ps0: 0,
        ps1: {value: 1, unit: "rem"},
        ps2: {value: 1.8, unit: "rem"},
        ps3: {value: 2.4, unit: "rem"},
        ps4: {value: 2.4, unit: "rem"},
        ps5: {value: 2.4, unit: "rem"},
        ps6: {value: 2.4, unit: "rem"},
        ps7: {value: 2.4, unit: "rem"},
        ps8: {value: 2.4, unit: "rem"},
        ps9: {value: 2.4, unit: "rem"},
        ps10: {value: 2.4, unit: "rem"},
        ps11: {value: 2.4, unit: "rem"},
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })

  test("given values are {ltr:[...], rtl:null}, should return {bidi:[...]}", () => {
    const key = "text-indent"
    const values = {ltr: [0, {value: 1.5, unit: "rem"}, {value: -1.5, unit: "rem"}], rtl: null}
    const expected = {
      bidi: {
        "no-indent": 0,
        indent: {value: 1.5, unit: "rem"},
        outdent: {value: -1.5, unit: "rem"},
      }
    }
    let got = utilities.createDefinitionData(key, values)
    expect(got).toStrictEqual(expected)
  })
})
