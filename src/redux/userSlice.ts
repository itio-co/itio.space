import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { auth, googleProvider } from '@/config/firebase'
import { signInWithRedirect } from 'firebase/auth'

const initialState = {
  email: '',
  token: '',
  displayName: '',
  photoURL: '',
}

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async () => {
    try {
      await signInWithRedirect(auth, googleProvider)
      // After redirect, the auth listener (useAuthListener) will handle the signed-in user
      return initialState
    } catch (error) {
      console.error("Google Sign-In Error", error)
      throw error
    }
  }
)

export const checkUserDataFromLocalStorage = createAsyncThunk(
  'user/checkUserDataFromLocalStorage',
  async () => {
    const userLocalStorage = localStorage.getItem('user')

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage)
      return {
        email: userData.email || '',
        token: userData.token || '',
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || '',
      }
    }
    return initialState
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
  reducers: {
    setUser: (_, action: PayloadAction<{ email: string; token: string; displayName: string; photoURL: string }>) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginWithGoogle.fulfilled,
        (_, action: PayloadAction<{ email: string; token: string; displayName: string; photoURL: string }>) => {
          return action.payload
        }
      )
      .addCase(
        checkUserDataFromLocalStorage.fulfilled,
        (_, action: PayloadAction<{ email: string; token: string; displayName: string; photoURL: string }>) => {
           return action.payload
        }
      )
      .addCase(logout.fulfilled, () => {
        return initialState
      })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
