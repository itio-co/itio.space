import React from 'react'
import { useRouter } from 'next/router'
import { loginWithGoogle } from '@/redux/userSlice'
import { useAppDispatch } from '@/redux/store'

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const getRedirectPath = () => {
    return (router.query.redirect as string) || '/'
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await dispatch(loginWithGoogle()).unwrap()
      if (result.token) {
        router.replace(getRedirectPath())
      }
    } catch (e) {
      console.log('Google login error', e)
    }
  }

  return (
    <div className="glass-card p-10 text-center">
      <h2
        className="text-2xl font-bold mb-8"
        style={{
          background: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome Back
      </h2>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 rounded-xl font-semibold text-white/80 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300 cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        Sign in with Google
      </button>
    </div>
  )
}

export default LoginForm
