import {createSlice} from '@reduxjs/toolkit'

const SLICE_NAME = 'instanceModal'
const initialState = {
  modal: {
    isOpen: false,
    meta: {
      onClickOk: () => null,
      onClickCancel: () => null,
      content: null,
      title: null,
      subtitle: null,
      description: null,
      okText: null,
      cancelText: null,
    },
  },
}

export const instanceModalSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    showInstanceModal(state, {payload: {isOpen, ...meta}}) {
      state.modal.isOpen = true
      state.modal.meta = {...state.modal.meta, ...meta}
    },
    closeInstanceModal(state) {
      state.modal.isOpen = false
      state.modal.meta = initialState.modal.meta
    },
    cleanInstanceModal(state) {
      state.modal.isOpen = false
      state.modal.meta = initialState.modal.meta || {}
    },
  },
})

/**
 * STATE SELECTORS
 */
export const modalSelector = (state: any) => state.instanceModal.modal

/**
 * Action creators are generated for each case reducer function
 */

export const {showInstanceModal, closeInstanceModal, cleanInstanceModal} =
  instanceModalSlice.actions

export default instanceModalSlice.reducer
