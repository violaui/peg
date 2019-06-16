import * as utilities from "./utilities";
import {convert} from "./converters";

export function sassWrapper(modules) {
  return {
    "get-typography-keys()": sassGetTypographyKeys,
    "get-color-keys()": sassGetColorKeys,
    "get-layout-keys()": sassGetLayoutKeys,
    "get-border-keys()": sassGetBorderKeys,
    "get-background-keys()": sassGetBackgroundKeys,
    "get-flex-keys()": sassGetFlexKeys,
    "get-grid-keys()": sassGetGridKeys,
    "get-states-keys()": sassGetStatesKeys,
    "get-element-keys()": sassGetElementKeys,
    "get-all-keys()": sassGetAllKeys(),

    "get-property-name($key)": sassGetPropName,
    "get-range($count, $start-from: 0, $step: 1, $prefix: \"\")": sassGetRange,
    "create-definition-data($key, $values)": sassCreateDefinitionData,
  }

  function sassGetTypographyKeys() {
    return convert.toSASS(modules.getTypographyKeys())
  }

  function sassGetColorKeys() {
    return convert.toSASS(modules.getColorKeys())
  }

  function sassGetLayoutKeys() {
    return convert.toSASS(modules.getLayoutKeys())
  }

  function sassGetBorderKeys() {
    return convert.toSASS(modules.getBorderKeys())
  }

  function sassGetBackgroundKeys() {
    return convert.toSASS(modules.getBackgroundKeys())
  }

  function sassGetFlexKeys() {
    return convert.toSASS(modules.getFlexKeys())
  }

  function sassGetGridKeys() {
    return convert.toSASS(modules.getGridKeys())
  }

  function sassGetStatesKeys() {
    return convert.toSASS(modules.getStatesKeys())
  }

  function sassGetElementKeys() {
    return convert.toSASS(modules.getElementKeys())
  }

  function sassGetAllKeys() {
    return convert.toSASS(modules.getAllKeys())
  }

  function sassGetRange(count, startFrom = convert.toSASS(0), step = convert.toSASS(1), prefix = convert.toSASS("")) {
    return convert.toSASS(utilities.getRange(convert.toJS(count), convert.toJS(startFrom), convert.toJS(step), convert.toJS(prefix)))
  }

  function sassGetPropName(key) {
    return convert.toSASS(utilities.getPropName(convert.toJS(key)))
  }

  function sassCreateDefinitionData(key, values) {
    return convert.toSASS(utilities.createDefinitionData(convert.toJS(key), convert.toJS(values)), "", false)
  }
}
