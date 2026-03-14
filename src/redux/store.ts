import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userReducer from './userSlice'
import langchainReducer from './langchainSlice'

const rootReducer = combineReducers({
  user: userReducer,
  langchain: langchainReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (module as any).hot.accept('./userSlice', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const nextUserReducer = require('./userSlice').default as typeof userReducer

      const newRootReducer = combineReducers({
        user: nextUserReducer,
        langchain: langchainReducer,
      })
      store.replaceReducer(newRootReducer)
    })
  }

  return store
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
