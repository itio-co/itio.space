import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import type { AppDispatch } from '@/redux/store'
import { checkUserDataFromLocalStorage } from '@/redux/userSlice'

export default function useAuthListener() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Immediately hydrate from localStorage to avoid flash of logged-out state
    dispatch(checkUserDataFromLocalStorage())

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const userData = {
          email: user.email || '',
          token,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        }
        dispatch(setUser(userData))
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        dispatch(setUser({ email: '', token: '', displayName: '', photoURL: '' }))
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [dispatch])
}
