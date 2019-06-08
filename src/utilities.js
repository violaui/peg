import {properties} from "./modules";

export function getRange(count, startFrom = 0, step = 1, prefix = "") {
  return [...Array(count).keys()]
    .map(i => (i + startFrom) * step)
    .map(e => `${prefix}${e}`)
}

export function getProp(key) {
  return properties.find(p => p.key === key)
}
