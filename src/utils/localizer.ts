import { createIntl, createIntlCache } from 'react-intl'

import esMessages from '../intl/es.json'

// Different browsers use different methods of getting the language
export const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language

export const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
export const messages = esMessages

export default function localize(incomingKey: string, ...restArgs: any) {
  // Split locales with a region code
  const locale = language.toLowerCase().split(/[_-]+/)[0]
  const intlCache = createIntlCache()
  const intl = createIntl({ locale, messages }, intlCache)
  const { formatMessage } = intl

  return formatMessage({ id: incomingKey }, ...restArgs)
}

export const defineLocalizeBaseKey =
  (baseKeyId: string) =>
    (key: string, ...restArgs: any) =>
      localize(`${baseKeyId}.${key}`, ...restArgs)