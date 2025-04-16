import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'

import {removeSnackBar, snackBarSelector} from '../../stateManagement/slices/notificationSlice'

let displayed = <any>[]

const useNotifier = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(snackBarSelector || [])

  const {enqueueSnackbar, closeSnackbar} = useSnackbar()

  const storeDisplayed = (id: any) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: any) => {
    displayed = [...displayed.filter((key: any) => id !== key)]
  }

  useEffect(() => {
    notifications.forEach(({key, message, options = {}, dismissed = false}: any) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options?.onClose) {
            options?.onClose(event, reason, myKey)
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackBar({key: myKey} as any))
          removeDisplayed(myKey)
        },
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useNotifier
