export const camelCaseToHumanCase = (value: string) => {
  const result = value.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const snakeCaseToHumanCase = (value: string) =>
  value
    .split('_')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ')

export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export const formatLifeCycleModules = (modules: string | string[]) => {
  if (!Array.isArray(modules)) {
    if (modules.toLowerCase() === 'a1a3') {
      return 'A1-A3'
    }
    return `${modules.toUpperCase()}`
  } else {
    const first = modules[0].toUpperCase()
    const last = modules[modules.length - 1].toUpperCase()
    return `${first}-${last}`
  }
}

export const transformUnit = (unit: string) =>
  unit.replace('m2', 'm²').replace('m3', 'm³').replace('kg/m2', 'kg/m²').replace('kWh/m2', 'kWh/m²')
