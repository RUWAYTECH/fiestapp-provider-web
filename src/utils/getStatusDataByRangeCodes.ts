import localize from "./localizer"


export const createSeverityType = (severityType: any, statusType: any) => ({
  severityType,
  statusType: statusType || severityType,
})

export const createCustomSeverityTypes = (msgTypes: any = {}) => {
  return Object.keys(msgTypes).reduce((prev, next) => {
    return { ...prev, [next]: createSeverityType(msgTypes[next], '') }
  }, {})
}

export const isInRange = (n: any, min: any, max: any) => n >= min && n <= max

export const stringToRange = (stringRange = '') => {
  const [rangeA, rangeB] = stringRange.split(',')
  return [Number(rangeA), Number(rangeB)]
}

export const setFormatTypeMsgSeverity = (severityTypeStatus: any, baseMessage: any) => ({
  type: severityTypeStatus,
  message: localize(`responseMessage.${baseMessage || severityTypeStatus}`),
})

export const getDataStatusByRanges = (configRanges: any) => (status: any) => {
  if (!configRanges) return

  const keyRange: any = Object.keys(configRanges).find(range => {
    const [min, max] = stringToRange(range)
    return isInRange(status, min, max)
  })

  return configRanges[keyRange]
}
