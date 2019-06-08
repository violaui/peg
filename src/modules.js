export const typography = [
  {key: "font-family", prop: "font-family", prefix: ""},
  {key: "font-size", prop: "font-size", prefix: "f"},
  {key: "font-weight", prop: "font-weight", prefix: "fw"},
  {key: "font-style", prop: "font-style", prefix: ""},
  {key: "text-align", prop: "text-align", prefix: "t"},
  {key: "text-transform", prop: "text-transform", prefix: "tt"},
  {key: "text-decoration", prop: "text-decoration", prefix: ""},
  {key: "text-indent", prop: "text-indent", prefix: ""},
  {key: "text-overflow", prop: "text-overflow", prefix: ""},
  {key: "text-shadow", prop: "text-shadow", prefix: "text"},
  {key: "vertical-align", prop: "vertical-align", prefix: "vertical"},
  {key: "line-height", prop: "line-height", prefix: "lh"},
  {key: "letter-spacing", prop: "letter-spacing", prefix: "letter"},
  {key: "word-spacing", prop: "word-spacing", prefix: "word"},
  {key: "writing-mode", prop: "writing-mode", prefix: "writing"},
  {key: "white-space", prop: "white-space", prefix: ""},
]

export const colors = [
  {key: "color", prop: "color", prefix: ''},
  {key: "text-decoration-color", prop: "text-decoration-color", prefix: 'decoration'},
  {key: "caret-color", prop: "caret-color", prefix: 'caret'},
]
export const layout = [
  {key: "margin", prop: "margin", prefix: "m"},
  {key: "margin-top", prop: "margin-top", prefix: "mt"},
  {key: "margin-right", prop: "margin-right", prefix: "mr"},
  {key: "margin-bottom", prop: "margin-bottom", prefix: "mb"},
  {key: "margin-left", prop: "margin-left", prefix: "ml"},

  {key: "margin-start", prop: "", prefix: "ms"},
  {key: "margin-end", prop: "", prefix: "me"},

  {key: "padding", prop: "padding", prefix: "p"},
  {key: "padding-top", prop: "padding-top", prefix: "pt"},
  {key: "padding-right", prop: "padding-right", prefix: "pr"},
  {key: "padding-bottom", prop: "padding-bottom", prefix: "pb"},
  {key: "padding-left", prop: "padding-left", prefix: "pl"},

  {key: "padding-start", prop: "", prefix: "ps"},
  {key: "padding-end", prop: "", prefix: "pe"},

  {key: "width", prop: "width", prefix: "w"},
  {key: "height", prop: "height", prefix: "h"},
  {key: "max-width", prop: "max-width", prefix: "max-w"},
  {key: "max-height", prop: "max-height", prefix: "max-h"},
  {key: "min-width", prop: "min-width", prefix: "min-w"},
  {key: "min-height", prop: "min-height", prefix: "min-h"},
  {key: "position", prop: "position", prefix: ""},
  {key: "display", prop: "display", prefix: ""},
  {key: "box-sizing", prop: "box-sizing", prefix: ""},
  {key: "top", prop: "top", prefix: "top"},
  {key: "-top", prop: "top", prefix: "top"},
  {key: "left", prop: "left", prefix: "left"},
  {key: "-left", prop: "left", prefix: "left"},
  {key: "right", prop: "right", prefix: "right"},
  {key: "-right", prop: "right", prefix: "right"},
  {key: "bottom", prop: "bottom", prefix: "bottom"},
  {key: "-bottom", prop: "bottom", prefix: "bottom"},

  {key: "start", prop: "", prefix: "start"},
  {key: "-start", prop: "", prefix: "start"},

  {key: "end", prop: "", prefix: "end"},
  {key: "-end", prop: "", prefix: "end"},

  {key: "opacity", prop: "opacity", prefix: "o"},
  {key: "overflow", prop: "overflow", prefix: "over"},
  {key: "overflow-x", prop: "overflow-x", prefix: "over-x"},
  {key: "overflow-y", prop: "overflow-y", prefix: "over-y"},
]

export const border = []
export const background = []
export const flex = []
export const grid = []
export const states = []
export const elements = []

export const properties = [
  ...typography,
  ...colors,
  ...layout,
  ...border,
  ...background,
  ...flex,
  ...grid,
  ...states,
  ...elements
]
