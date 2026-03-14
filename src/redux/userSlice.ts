import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { auth, googleProvider } from '@/config/firebase'
import { signInWithPopup } from 'firebase/auth'

const initialState = {
  email: '',
  token: '',
}

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const token = await user.getIdToken()

      const userData = {
        email: user.email || '',
        token
      }

      localStorage.setItem('user', JSON.stringify(userData))

      return userData
    } catch (error) {
      console.error("Google Sign-In Error", error)
      throw error
    }
  }
)

export const checkUserDataFromLocalStorage = createAsyncThunk(
  'user/checkUserDataFromLocalStorage',
  async () => {
    try {
      const userLocalStorage = localStorage.getItem('user')

      if (userLocalStorage) {
        const userData = JSON.parse(userLocalStorage)
        return userData
      }
      return initialState
    } catch (error) {
      throw error
    }
  },
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logout = createAsyncThunk('user/logout', async (_) => {
  try {
    localStorage.removeItem('user')
    await auth.signOut()

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
        loginWithGoogle.fulfilled,
        (_, action: PayloadAction<{ email: string; token: string }>) => {
          return action.payload
        }
      )
      .addCase(
        checkUserDataFromLocalStorage.fulfilled,
        (_, action: PayloadAction<{ email: string; token: string }>) => {
           return action.payload
        }
      )
      .addCase(logout.fulfilled, () => {
        return initialState
      })
  },
})

export default userSlice.reducer
