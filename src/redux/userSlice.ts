import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { auth, googleProvider } from '@/config/firebase'
import { signInWithPopup } from 'firebase/auth'

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

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const token = await user.getIdToken()

      const userData = {
        email: user.email || '',
        password: '', // Password is not applicable for Google Auth
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
  async (_, { dispatch }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const userLocalStorage = localStorage.getItem('user')

      if (userLocalStorage) {
        const userData = JSON.parse(userLocalStorage)
        // If it was a google login (no password), we might want to re-verify or just load state
        // For simplicity in this demo, we just restore the state.
        // If we wanted to really re-auth, we'd rely on onAuthStateChanged from firebase
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
        login.fulfilled,
        (_, action: PayloadAction<{ email: string; password: string; token: string }>) => {
          return action.payload
        },
      )
      .addCase(
        loginWithGoogle.fulfilled,
        (_, action: PayloadAction<{ email: string; password: string; token: string }>) => {
          return action.payload
        }
      )
      .addCase(
        checkUserDataFromLocalStorage.fulfilled,
        (_, action: PayloadAction<{ email: string; password: string; token: string }>) => {
           // checkUserDataFromLocalStorage might return initialState if nothing found
           return action.payload
        }
      )
      .addCase(logout.fulfilled, () => {
        return initialState
      })
  },
})

export default userSlice.reducer
