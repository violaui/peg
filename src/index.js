export default function (sass) {
  let data = {
    typography: [
      {key: "", property: "font-family", abbrivation: "", modifiers: []},
      {key: "", property: "font-size", abbrivation: "", modifiers: []},
      {key: "", property: "font-weight", abbrivation: "", modifiers: []},
      {key: "", property: "font-style", abbrivation: "", modifiers: []},
      {key: "", property: "text-align", abbrivation: "", modifiers: []},
      {key: "", property: "text-transform", abbrivation: "", modifiers: []},
      {key: "", property: "text-decoration", abbrivation: "", modifiers: []},
      {key: "", property: "text-indent", abbrivation: "", modifiers: []},
      {key: "", property: "text-overflow", abbrivation: "", modifiers: []},
      {key: "", property: "text-shadow", abbrivation: "", modifiers: []},
      {key: "", property: "vertical-align", abbrivation: "", modifiers: []},
      {key: "", property: "line-height", abbrivation: "", modifiers: []},
      {key: "", property: "letter-spacing", abbrivation: "", modifiers: []},
      {key: "", property: "word-spacing", abbrivation: "", modifiers: []},
      {key: "", property: "writing-mode", abbrivation: "", modifiers: []},
      {key: "", property: "white-space", abbrivation: "", modifiers: []},
    ],
    colors: [],
    layout: [],
    border: [],
    background: [],
    flex: [],
    grid: [],
    states: [],
    elements: [],
  }

  return {
    'range($count, $start-from: 0, $step: 1, $prefix: \"\")': range
  }

  function range(count, startFrom = 0, step = 1, prefix = "") {
    let c = count.getValue(),
      sf = startFrom.getValue(),
      s = step.getValue(),
      p = prefix.getValue();

    let l = new sass.types.List(c);
    [...Array(c).keys()]
      .map(i => (i + sf) * s)
      .map(e => `${p}${e.toString()}`)
      .map((e, i) => l.setValue(i, new sass.types.String(e)))

    return l
  }
}
