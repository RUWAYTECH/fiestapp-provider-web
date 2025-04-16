import {
  showInstanceModal,
  closeInstanceModal as closeInstanceModalAction,
} from '../../stateManagement/slices/instanceModalSlice'
import store from '../../stateManagement/store'

export const launchInstanceModal = (options: any) => {
  return store.dispatch(showInstanceModal(options))
}

export const closeInstanceModal = () => {
  return store.dispatch(closeInstanceModalAction())
}
