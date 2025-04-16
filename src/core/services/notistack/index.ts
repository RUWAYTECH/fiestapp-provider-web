import { enqueueSnackBar } from '../../../stateManagement/slices/notificationSlice'
import { enqueueFormattedMsg } from '../../../utils/format'
import store from '../../../stateManagement/store'
import { httpStatusCodes } from '../../constants'


export const dispatchNotifyStack = (msg: any, statusCode: any) =>
  store.dispatch(enqueueSnackBar(enqueueFormattedMsg(msg, statusCode)))

export const dispatchNotifyStackError = (err: any) => {

  if (err?.data?.messages) {
    let message = '';
    err?.data?.messages.forEach((item: any) => {
      message = item.message + ' ' + message
    })

    store.dispatch(enqueueSnackBar(enqueueFormattedMsg({ message: message }, httpStatusCodes.BAD_REQUEST)))
  }
  store.dispatch(enqueueSnackBar(enqueueFormattedMsg({ message: err }, httpStatusCodes.BAD_REQUEST)))
}

export const dispatchNotifyStackSuccess = (msg: any) =>
  store.dispatch(enqueueSnackBar(enqueueFormattedMsg({ message: msg }, httpStatusCodes.OK)))
