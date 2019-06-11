import * as utilities from "./utilities";

export function sassWrapper(modules, {toSassValue}) {
  return {
    'get-typography-keys()': sassGetTypographyKeys,
    'get-color-keys()': sassGetColorKeys,
    'get-layout-keys()': sassGetLayoutKeys,
    'get-border-keys()': sassGetBorderKeys,
    'get-background-keys()': sassGetBackgroundKeys,
    'get-flex-keys()': sassGetFlexKeys,
    'get-grid-keys()': sassGetGridKeys,
    'get-states-keys()': sassGetStatesKeys,
    'get-element-keys()': sassGetElementKeys,
    'get-all-keys()': sassGetAllKeys(),

    'get-property-name($key)': sassGetPropName,
    'get-range($count, $start-from: 0, $step: 1, $prefix: \"\")': sassGetRange,
  }

  function sassGetTypographyKeys() {
    return toSassValue(modules.getTypographyKeys())
  }

  function sassGetColorKeys() {
    return toSassValue(modules.getColorKeys())
  }

  function sassGetLayoutKeys() {
    return toSassValue(modules.getLayoutKeys())
  }

  function sassGetBorderKeys() {
    return toSassValue(modules.getBorderKeys())
  }

  function sassGetBackgroundKeys() {
    return toSassValue(modules.getBackgroundKeys())
  }

  function sassGetFlexKeys() {
    return toSassValue(modules.getFlexKeys())
  }

  function sassGetGridKeys() {
    return toSassValue(modules.getGridKeys())
  }

  function sassGetStatesKeys() {
    return toSassValue(modules.getStatesKeys())
  }

  function sassGetElementKeys() {
    return toSassValue(modules.getElementKeys())
  }

  function sassGetAllKeys() {
    return toSassValue(modules.getAllKeys())
  }

  function sassGetRange(count, startFrom = toSassValue(0), step = toSassValue(1), prefix = toSassValue("")) {
    return toSassValue(utilities.getRange(count.getValue(), startFrom.getValue(), step.getValue(), prefix.getValue()))
  }

  function sassGetPropName(key) {
    return toSassValue(utilities.getPropName(key.getValue()))
  }
}
