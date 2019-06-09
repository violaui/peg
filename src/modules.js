import {getRange} from "./utilities";

export const typography = [
  {key: "font-family", prop: "font-family", classPrefix: "", valueNames: ["primary", "secondary", "tertiary", "code"]},
  {key: "font-size", prop: "font-size", classPrefix: "f", valueNames: [...getRange(6, 1, 1, "f")]},
  {key: "font-weight", prop: "font-weight", classPrefix: "fw", valueNames: [...getRange(9, 1, 100)]},
  {key: "font-style", prop: "font-style", classPrefix: "", valueNames: ["i"]},
  // {key: "font-variation", prop: "font-variation-settings", classPrefix: "fv", valueNames: []},
  {key: "text-align", prop: "text-align", classPrefix: "t", valueNames: ["l", "r", "c", "j", "s", "e"]},
  {key: "text-transform", prop: "text-transform", classPrefix: "tt", valueNames: ["-none", "-cap", "-low", "-upp"]},
  {
    key: "text-decoration",
    prop: "text-decoration",
    classPrefix: "",
    valueNames: ["no-underline", "underline", "strike"]
  },
  {key: "text-indent", prop: "text-indent", classPrefix: "", valueNames: ["no-indent", "indent", "outdent"]},
  {key: "text-overflow", prop: "text-overflow", classPrefix: "", valueNames: ["text-clip", "ellipsis"]},
  {key: "text-shadow", prop: "text-shadow", classPrefix: "text", valueNames: [...getRange(4, 1, 1, "-shadow-")]},
  {key: "vertical-align", prop: "vertical-align", classPrefix: "vertical", valueNames: ["-base", "-m", "-t", "-b"]},
  {key: "line-height", prop: "line-height", classPrefix: "lh", valueNames: [...getRange(3, 1)]},
  {key: "letter-spacing", prop: "letter-spacing", classPrefix: "letter", valueNames: ["-normal", "-dense", "-sparse"]},
  {key: "word-spacing", prop: "word-spacing", classPrefix: "word", valueNames: ["-normal", "-dense", "-sparse"]},
  {key: "writing-mode", prop: "writing-mode", classPrefix: "writing", valueNames: ["-h", "-vrl", "-vlr"]},
  {
    key: "white-space",
    prop: "white-space",
    classPrefix: "",
    valueNames: ["nowrap", "pre-only", "pre-wrap", "pre-line"]
  },
]

const colorNames = [
  "transparent", "white", "black",
  ...getRange(9, 1, 1, "white-t-"),
  ...getRange(9, 1, 1, "gray-"),
  ...getRange(9, 1, 1, "black-t-"),
  "red", "dark-orange", "orange", "gold", "yellow", "light-green",
  "green", "cyan", "light-blue", "blue", "purple", "magenta"
]

export const colors = [
  {key: "color", prop: "color", classPrefix: "", valueNames: colorNames},
  {key: "text-decoration-color", prop: "text-decoration-color", classPrefix: "decoration", valueNames: colorNames},
  {key: "caret-color", prop: "caret-color", classPrefix: "caret", valueNames: colorNames},
]
const steps = getRange(12)
const sideSteps = getRange(5, 1)
const sideStepsNeg = getRange(5, 1, 1, "-")
const overflows = ["visible", "hidden", "clip", "scroll", "auto"]
export const layout = [
  {key: "margin", prop: "margin", classPrefix: "m", valueNames: [...steps]},
  {key: "margin-top", prop: "margin-top", classPrefix: "mt", valueNames: [...steps]},
  {key: "margin-right", prop: "margin-right", classPrefix: "mr", valueNames: [...steps]},
  {key: "margin-bottom", prop: "margin-bottom", classPrefix: "mb", valueNames: [...steps]},
  {key: "margin-left", prop: "margin-left", classPrefix: "ml", valueNames: [...steps]},
  {key: "margin-start", prop: "", classPrefix: "ms", valueNames: [...steps]},
  {key: "margin-end", prop: "", classPrefix: "me", valueNames: [...steps]},

  {key: "padding", prop: "padding", classPrefix: "p", valueNames: [...steps]},
  {key: "padding-top", prop: "padding-top", classPrefix: "pt", valueNames: [...steps]},
  {key: "padding-right", prop: "padding-right", classPrefix: "pr", valueNames: [...steps]},
  {key: "padding-bottom", prop: "padding-bottom", classPrefix: "pb", valueNames: [...steps]},
  {key: "padding-left", prop: "padding-left", classPrefix: "pl", valueNames: [...steps]},
  {key: "padding-start", prop: "", classPrefix: "ps", valueNames: [...steps]},
  {key: "padding-end", prop: "", classPrefix: "pe", valueNames: [...steps]},

  {key: "width", prop: "width", classPrefix: "w", valueNames: [...steps]},
  {key: "width-p", prop: "width", classPrefix: "w-p", valueNames: [...getRange(10, 1, 10)]},
  {key: "width-v", prop: "width", classPrefix: "w-v", valueNames: [...getRange(10, 1, 10)]},

  {key: "height", prop: "height", classPrefix: "h", valueNames: [...steps]},
  {key: "height-p", prop: "height", classPrefix: "h-p", valueNames: [...getRange(10, 1, 10)]},
  {key: "height-v", prop: "height", classPrefix: "h-v", valueNames: [...getRange(10, 1, 10)]},

  {key: "max-width", prop: "max-width", classPrefix: "max-w", valueNames: [...steps]},
  {key: "max-height", prop: "max-height", classPrefix: "max-h", valueNames: [...steps]},
  {key: "min-width", prop: "min-width", classPrefix: "min-w", valueNames: [...steps]},
  {key: "min-height", prop: "min-height", classPrefix: "min-h", valueNames: [...steps]},
  {
    key: "position",
    prop: "position",
    classPrefix: "",
    valueNames: ["static", "relative", "absolute", "fixed", "sticky"]
  },
  {
    key: "display",
    prop: "display",
    classPrefix: "",
    valueNames: ["block", "inline", "inline-block", "grid", "flex", "inline-flex", "inline-grid"]
  },
  {key: "box-sizing", prop: "box-sizing", classPrefix: "", valueNames: ["border-box", "content-box"]},
  {key: "top", prop: "top", classPrefix: "top", valueNames: [...sideSteps]},
  {key: "-top", prop: "top", classPrefix: "top", valueNames: [...sideStepsNeg]},
  {key: "left", prop: "left", classPrefix: "left", valueNames: [...sideSteps]},
  {key: "-left", prop: "left", classPrefix: "left", valueNames: [...sideStepsNeg]},
  {key: "right", prop: "right", classPrefix: "right", valueNames: [...sideSteps]},
  {key: "-right", prop: "right", classPrefix: "right", valueNames: [...sideStepsNeg]},
  {key: "bottom", prop: "bottom", classPrefix: "bottom", valueNames: [...sideSteps]},
  {key: "-bottom", prop: "bottom", classPrefix: "bottom", valueNames: [...sideStepsNeg]},
  {key: "start", prop: "", classPrefix: "start", valueNames: [...sideSteps]},
  {key: "-start", prop: "", classPrefix: "start", valueNames: [...sideStepsNeg]},
  {key: "end", prop: "", classPrefix: "end", valueNames: [...sideSteps]},
  {key: "-end", prop: "", classPrefix: "end", valueNames: [...sideStepsNeg]},

  {key: "opacity", prop: "opacity", classPrefix: "o", valueNames: [...getRange(11, 0, 10, "-")]},
  {key: "overflow", prop: "overflow", classPrefix: "over", valueNames: [...overflows]},
  {key: "overflow-x", prop: "overflow-x", classPrefix: "over-x", valueNames: [...overflows]},
  {key: "overflow-y", prop: "overflow-y", classPrefix: "over-y", valueNames: [...overflows]},
]

export const border = []

export const background = []

export const flex = [
  {key: "flex", prop: "flex", classPrefix: ""},
  {key: "flex-basis", prop: "flex-basis", classPrefix: ""},
  {key: "flex-direction", prop: "flex-direction", classPrefix: ""},
  {key: "flex-flow", prop: "flex-flow", classPrefix: ""},
  {key: "flex-grow", prop: "flex-grow", classPrefix: ""},
  {key: "flex-shrink", prop: "flex-shrink", classPrefix: ""},
  {key: "flex-wrap", prop: "flex-wrap", classPrefix: ""},
  {key: "justify-content", prop: "justify-content", classPrefix: ""},
  {key: "justify-items", prop: "justify-items", classPrefix: ""},
  {key: "justify-self", prop: "justify-self", classPrefix: ""},
  {key: "align-content", prop: "align-content", classPrefix: ""},
  {key: "align-items", prop: "align-items", classPrefix: ""},
  {key: "align-self", prop: "align-self", classPrefix: ""},
  {key: "order", prop: "order", classPrefix: ""},
  {key: "place-items", prop: "place-items", classPrefix: ""},
  {key: "place-self", prop: "place-self", classPrefix: ""},
]

export const grid = []

export const states = [
  {key: "hover", prop: ":hover", classPrefix: "hover"},
  {key: "checked", prop: ":checked", classPrefix: "checked"},
  {key: "active", prop: ":active", classPrefix: "active"},
  {key: "disabled", prop: ":disabled", classPrefix: "disabled"},
  {key: "enabled", prop: ":enabled", classPrefix: "enabled"},
  {key: "focus", prop: ":focus", classPrefix: "focus"},
  {key: "link", prop: ":link", classPrefix: "link"},
]

export const elements = [
  {key: "cursor", prop: "cursor", classPrefix: ""},
  {key: "list", prop: "list", classPrefix: ""},
  {key: "image", prop: "image", classPrefix: ""},
]

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
