import {createSlice, createSelector} from '@reduxjs/toolkit'

const initialState = {
  snackBars: [],
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueSnackBar(state: any, action: any) {
      const messages = action.payload || []

      let stackedMessages = []

      if ((action.payload || []).length) {
        stackedMessages = messages.map((snack: any) => snack)
      } else {
        stackedMessages = [
          {
            ...action.payload,
            key: action.payload?.key,
          },
        ]
      }

      state.snackBars = [...state.snackBars, ...stackedMessages]
    },
    closeSnackBar(state: any, action: any) {
      state.snackBars = (state.snackBars || []).map((snackBar: any) =>
        action.payload?.dismissAll || snackBar.key === action.payload?.key
          ? {...snackBar, dismissed: true}
          : {...snackBar},
      )
    },
    removeSnackBar(state: any, action: any) {
      state.snackBars = (state.snackBars || []).filter(
        (snackBar: any) => snackBar.key !== action.payload?.key,
      )
    },
  },
})

export const {enqueueSnackBar, closeSnackBar, removeSnackBar} = notificationsSlice.actions

// selectors
const snackBarsState = (store: any) => store.notifications.snackBars

export const snackBarSelector = createSelector(snackBarsState, store => store)

export default notificationsSlice.reducer
