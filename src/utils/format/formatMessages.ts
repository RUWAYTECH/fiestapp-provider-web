import httpStatusCodes, {
  resStatusRanges as stsRange,
  resStatusKeys as stsKey,
} from '../../core/constants/httpStatusCodes'
import severityTypes, {messageTypes} from '../../core/constants/severityTypes'
import {
  getDataStatusByRanges,
  createSeverityType,
  createCustomSeverityTypes,
  setFormatTypeMsgSeverity,
} from '../getStatusDataByRangeCodes'

const CONFIG_STATUS_CODES_BY_RANGES = {
  [stsRange[stsKey.CUSTOMS]]: {
    ...createSeverityType(severityTypes.INFO, undefined),
    customCodes: {
      ...createCustomSeverityTypes(messageTypes),
    },
  },
  [stsRange[stsKey.INFO]]: createSeverityType(severityTypes.INFO, undefined),
  [stsRange[stsKey.SUCCESS]]: createSeverityType(severityTypes.SUCCESS, undefined),
  [stsRange[stsKey.REDIRECTS]]: createSeverityType(
    severityTypes.WARNING,
    stsKey.REDIRECTS,
  ),
  [stsRange[stsKey.ERRORS_CLIENT]]: createSeverityType(
    severityTypes.ERROR,
    stsKey.ERRORS_CLIENT,
  ),
  [stsRange[stsKey.ERRORS_SERVER]]: createSeverityType(
    severityTypes.ERROR,
    stsKey.ERRORS_SERVER,
  ),
}

const getDataByStatus = getDataStatusByRanges(CONFIG_STATUS_CODES_BY_RANGES)

const getSeverityType = (status: any) => {
  if (typeof status !== 'number') return
  const {severityType, statusType, customCodes = {}} = getDataByStatus(status)

  const svtType = customCodes[status]?.severityType || severityType || severityTypes.INFO
  const stsType = customCodes[status]?.statusType || statusType

  return setFormatTypeMsgSeverity(svtType, stsType)
}

export const enqueueFormattedMsg = (
  {message, key, options, messageType, ...rest}: any = {},
  statusCode: any,
) => ({
  message,
  key: key || new Date().getTime() + Math.random(),
  ...rest,
  options: {
    ...options,
    variant: getSeverityType(messageType || statusCode)?.type,
  },
})

export const formatMessagesFromResponse = (response: any) => {
  const dataRes = response?.data || {}
  const statusCode = response?.status || httpStatusCodes.BAD_REQUEST

  const formattedMessages = (dataRes.messages || []).map((msg: any) =>
    enqueueFormattedMsg(msg, statusCode),
  )

  if (formattedMessages.length) return formattedMessages

  return enqueueFormattedMsg(
    {
      message: getSeverityType(statusCode)?.message,
    },
    statusCode,
  )
}