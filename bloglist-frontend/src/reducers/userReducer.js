import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    },
    resetUser(state) {
      state = null
      return state
    }
  },
})

export const { setUser, resetUser } = userSlice.actions

export const loggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = userObject => {
  return async dispatch => {
    const user = await loginService.login(userObject)

    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      window.localStorage.clear()

      dispatch(resetUser())

      return 'ok'
    } catch (error) {
      return error.message
    }
  }
}

export default userSlice.reducer