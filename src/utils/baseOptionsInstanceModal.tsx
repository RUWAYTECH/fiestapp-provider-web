import { defineLocalizeBaseKey } from './localizer';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /**
   * Predefined options for Instance Modal
   */

  modalGeneric: (modalOptions: any) => {
    const t = defineLocalizeBaseKey('modal')
    return {
      title: t('confirmTitle'),
      ...modalOptions,
    }
  },

  alertOk: (modalOptions: any) => {
    const t = defineLocalizeBaseKey('modal')
    return {
      subtitle: t('confirmSubtitle'),
      okText: t('okText'),
      ...modalOptions,
    }
  },
  confirm: (modalOptions: any) => {
    const t = defineLocalizeBaseKey('modal')    
    return {
      title: t('confirmTitle'),
      subtitle: t('confirmSubtitle'),
      cancelText: t('cancelText'),
      okText: t('okText'),
      ...modalOptions,
    }
  },

}
