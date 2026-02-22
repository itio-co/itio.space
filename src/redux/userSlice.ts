import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
  token: '',
}

export const login = createAsyncThunk(
  'user/login',
  async (body: { email: string; password: string }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = btoa(`${body.email}:${body.password}`)

      const userData = { email: body.email, password: body.password, token }

      localStorage.setItem('user', JSON.stringify(userData))

      return userData
    } catch (error) {
      throw error
    }
  },
)

export const checkUserDataFromLocalStorage = createAsyncThunk(
  'user/checkUserDataFromLocalStorage',
  async (_, { dispatch }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const userLocalStorage = localStorage.getItem('user')

      if (userLocalStorage) {
        const userData = JSON.parse(userLocalStorage)
        await dispatch(login({ email: userData.email, password: userData.password }))
      }
    } catch (error) {
      throw error
    }
  },
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logout = createAsyncThunk('user/logout', async (_) => {
  try {
    localStorage.removeItem('user')

    return initialState
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) { /* empty */ }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (_, action: PayloadAction<{ email: string; password: string; token: string }>) => {
          return action.payload
        },
      )
      .addCase(logout.fulfilled, () => {
        return initialState
      })
  },
})

export default userSlice.reducer
