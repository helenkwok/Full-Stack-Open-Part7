import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null, messageStyle: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = initialState
      return state
    }
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, messageStyle, seconds) => {
  return async dispatch => {
    dispatch(addNotification({
      message: message,
      messageStyle: messageStyle
    }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
