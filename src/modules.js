import {getRange} from "./utilities";

// Typography
const fontFamilies = ["primary", "secondary", "tertiary", "code"];
const fontSizes = getRange(6, 1, 1, "f");
const fontWeights = getRange(9, 1, 100, "fw");
const fontStyles = ["i"];
const textAligns = ["l", "r", "c", "j", "s", "e"].map(e => `t${e}`);
const textTransformations = ["none", "cap", "low", "upp"].map(e => `tt-${e}`);
const textDecorations = ["no-underline", "underline", "strike"];
const textIndents = ["no-indent", "indent", "outdent"];
const textOverflows = ["text-clip", "ellipsis"];
const textShadows = getRange(4, 1, 1, "t-shadow-");
const verticalAligns = ["base", "m", "t", "b"].map(e => `vertical-${e}`);
const lineHeights = getRange(3, 1).map(e => `lh${e}`);
const letterSpacings = ["normal", "dense", "sparse"].map(e => `letter-${e}`);
const wordSpacings = ["normal", "dense", "sparse"].map(e => `word-${e}`);
const writingModes = ["h", "vrl", "vlr"].map(e => `writing-${e}`);
const whiteSpaces = ["nowrap", "pre-only", "pre-wrap", "pre-line"];
const fontVariations = [].map(e => `fv-${e}`);

// Color
const colorNames = [
  "transparent", "white", "black",
  ...getRange(9, 1, 1, "white-t-"),
  ...getRange(9, 1, 1, "gray-"),
  ...getRange(9, 1, 1, "black-t-"),
  "red", "dark-orange", "orange", "gold", "yellow", "light-green", "green", "cyan", "light-blue", "blue", "purple", "magenta"
]
const textDecorationColors = colorNames.map(e => `decoration-${e}`)
const caretColors = colorNames.map(e => `caret-${e}`)

// Layout
const dimSteps = getRange(12)
const relativeSizes = getRange(10, 1, 10);
const sideSteps = getRange(5, 1)
const positions = ["static", "relative", "absolute", "fixed", "sticky"];
const displayNames = ["block", "inline", "inline-block", "grid", "flex", "inline-flex", "inline-grid"];
const boxSizingNames = ["border-box", "content-box"];
const opacityNames = getRange(11, 0, 10, "o-");
const overflows = ["visible", "hidden", "clip", "scroll", "auto"]

export const typography = [
  {key: "font-family", prop: "font-family", valueNames: fontFamilies},
  {key: "font-size", prop: "font-size", valueNames: fontSizes},
  {key: "font-weight", prop: "font-weight", valueNames: fontWeights},
  {key: "font-style", prop: "font-style", valueNames: fontStyles},
  {key: "text-align", prop: "text-align", valueNames: textAligns},
  {key: "text-transform", prop: "text-transform", valueNames: textTransformations},
  {key: "text-decoration", prop: "text-decoration", valueNames: textDecorations},
  {key: "text-indent", prop: "text-indent", valueNames: textIndents},
  {key: "text-overflow", prop: "text-overflow", valueNames: textOverflows},
  {key: "text-shadow", prop: "text-shadow", valueNames: textShadows},
  {key: "vertical-align", prop: "vertical-align", valueNames: verticalAligns},
  {key: "line-height", prop: "line-height", valueNames: lineHeights},
  {key: "letter-spacing", prop: "letter-spacing", valueNames: letterSpacings},
  {key: "word-spacing", prop: "word-spacing", valueNames: wordSpacings},
  {key: "writing-mode", prop: "writing-mode", valueNames: writingModes},
  {key: "white-space", prop: "white-space", valueNames: whiteSpaces},
  {key: "font-variation", prop: "font-variation-settings", valueNames: fontVariations},
]
export const colors = [
  {key: "color", prop: "color", valueNames: colorNames},
  {key: "text-decoration-color", prop: "text-decoration-color", valueNames: textDecorationColors},
  {key: "caret-color", prop: "caret-color", valueNames: caretColors},
]
export const layout = [
  {key: "margin", prop: "margin", valueNames: dimSteps.map(e => `m${e}`)},
  {key: "margin-top", prop: "margin-top", valueNames: dimSteps.map(e => `mt${e}`)},
  {key: "margin-right", prop: "margin-right", valueNames: dimSteps.map(e => `mr${e}`)},
  {key: "margin-bottom", prop: "margin-bottom", valueNames: dimSteps.map(e => `mb${e}`)},
  {key: "margin-left", prop: "margin-left", valueNames: dimSteps.map(e => `ml${e}`)},
  {key: "margin-start", prop: {ltr: "margin-left", rtl: "margin-right"}, valueNames: dimSteps.map(e => `ms${e}`)},
  {key: "margin-end", prop: {ltr: "margin-right", rtl: "margin-left"}, valueNames: dimSteps.map(e => `me${e}`)},
  {key: "padding", prop: "padding", valueNames: dimSteps.map(e => `p${e}`)},
  {key: "padding-top", prop: "padding-top", valueNames: dimSteps.map(e => `pt${e}`)},
  {key: "padding-right", prop: "padding-right", valueNames: dimSteps.map(e => `pr${e}`)},
  {key: "padding-bottom", prop: "padding-bottom", valueNames: dimSteps.map(e => `pb${e}`)},
  {key: "padding-left", prop: "padding-left", valueNames: dimSteps.map(e => `pl${e}`)},
  {key: "padding-start", prop: {ltr: "padding-left", rtl: "padding-right"}, valueNames: dimSteps.map(e => `ps${e}`)},
  {key: "padding-end", prop: {ltr: "padding-right", rtl: "padding-left"}, valueNames: dimSteps.map(e => `pe${e}`)},
  {key: "width", prop: "width", valueNames: dimSteps.map(e => `w${e}`)},
  {key: "height", prop: "height", valueNames: dimSteps.map(e => `h${e}`)},
  {key: "max-width", prop: "max-width", valueNames: dimSteps.map(e => `max-w-${e}`)},
  {key: "max-height", prop: "max-height", valueNames: dimSteps.map(e => `max-h-${e}`)},
  {key: "min-width", prop: "min-width", valueNames: dimSteps.map(e => `min-w-${e}`)},
  {key: "min-height", prop: "min-height", valueNames: dimSteps.map(e => `min-h-${e}`)},
  {key: "width-p", prop: "width", valueNames: relativeSizes.map(e => `wp${e}`)},
  {key: "width-v", prop: "width", valueNames: relativeSizes.map(e => `wv${e}`)},
  {key: "height-p", prop: "height", valueNames: relativeSizes.map(e => `hp${e}`)},
  {key: "height-v", prop: "height", valueNames: relativeSizes.map(e => `hv${e}`)},
  {key: "top", prop: "top", valueNames: sideSteps.map(e => `top-${e}`)},
  {key: "left", prop: "left", valueNames: sideSteps.map(e => `left-${e}`)},
  {key: "right", prop: "right", valueNames: sideSteps.map(e => `right-${e}`)},
  {key: "bottom", prop: "bottom", valueNames: sideSteps.map(e => `bottom-${e}`)},
  {key: "start", prop: {ltr: "left", rtl: "right"}, valueNames: sideSteps.map(e => `start-${e}`)},
  {key: "end", prop: {ltr: "right", rtl: "left"}, valueNames: sideSteps.map(e => `end-${e}`)},
  {key: "-top", prop: "top", valueNames: sideSteps.map(e => `top--${e}`)},
  {key: "-left", prop: "left", valueNames: sideSteps.map(e => `left--${e}`)},
  {key: "-right", prop: "right", valueNames: sideSteps.map(e => `right--${e}`)},
  {key: "-bottom", prop: "bottom", valueNames: sideSteps.map(e => `bottom--${e}`)},
  {key: "-start", prop: {ltr: "left", rtl: "right"}, valueNames: sideSteps.map(e => `start--${e}`)},
  {key: "-end", prop: {ltr: "right", rtl: "left"}, valueNames: sideSteps.map(e => `end--${e}`)},
  {key: "position", prop: "position", valueNames: positions},
  {key: "display", prop: "display", valueNames: displayNames},
  {key: "box-sizing", prop: "box-sizing", valueNames: boxSizingNames},
  {key: "opacity", prop: "opacity", valueNames: opacityNames},
  {key: "overflow", prop: "overflow", valueNames: overflows.map(e => `over-${e}`)},
  {key: "overflow-x", prop: "overflow-x", valueNames: overflows.map(e => `over-x-${e}`)},
  {key: "overflow-y", prop: "overflow-y", valueNames: overflows.map(e => `over-y-${e}`)},
]
export const border = []
export const background = []
export const flex = [
  {key: "flex", prop: "flex", valueNames: []},
  {key: "flex-basis", prop: "flex-basis", valueNames: []},
  {key: "flex-direction", prop: "flex-direction", valueNames: []},
  {key: "flex-flow", prop: "flex-flow", valueNames: []},
  {key: "flex-grow", prop: "flex-grow", valueNames: []},
  {key: "flex-shrink", prop: "flex-shrink", valueNames: []},
  {key: "flex-wrap", prop: "flex-wrap", valueNames: []},
  {key: "justify-content", prop: "justify-content", valueNames: []},
  {key: "justify-items", prop: "justify-items", valueNames: []},
  {key: "justify-self", prop: "justify-self", valueNames: []},
  {key: "align-content", prop: "align-content", valueNames: []},
  {key: "align-items", prop: "align-items", valueNames: []},
  {key: "align-self", prop: "align-self", valueNames: []},
  {key: "order", prop: "order", valueNames: []},
  {key: "place-items", prop: "place-items", valueNames: []},
  {key: "place-self", prop: "place-self", valueNames: []},
]
export const grid = []
export const states = [
  {key: "hover", prop: ":hover", valueNames: ["hover"]},
  {key: "checked", prop: ":checked", valueNames: ["checked"]},
  {key: "active", prop: ":active", valueNames: ["active"]},
  {key: "disabled", prop: ":disabled", valueNames: ["disabled"]},
  {key: "enabled", prop: ":enabled", valueNames: ["enabled"]},
  {key: "focus", prop: ":focus", valueNames: ["focus"]},
  {key: "link", prop: ":link", valueNames: ["link"]},
]
export const elements = [
  {key: "cursor", prop: "cursor", valueNames: []},
  {key: "list", prop: "list", valueNames: []},
  {key: "image", prop: "image", valueNames: []},
]
export const all = [
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

export function getTypographyKeys() {
  return typography.map(e => e.key)
}

export function getColorKeys() {
  return colors.map(e => e.key)
}

export function getLayoutKeys() {
  return layout.map(e => e.key)
}

export function getBorderKeys() {
  return border.map(e => e.key)
}

export function getBackgroundKeys() {
  return background.map(e => e.key)
}

export function getFlexKeys() {
  return flex.map(e => e.key)
}

export function getGridKeys() {
  return grid.map(e => e.key)
}

export function getStatesKeys() {
  return states.map(e => e.key)
}

export function getElementKeys() {
  return elements.map(e => e.key)
}

export function getAllKeys() {
  return all.map(e => e.key)
}
