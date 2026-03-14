import React, { FormEvent } from 'react'
import { TextField } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { login, loginWithGoogle } from '@/redux/userSlice'
import { useAppDispatch } from '@/redux/store'

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: 'rgba(255,255,255,0.9)',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.15)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(167,139,250,0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#a78bfa',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.5)',
    '&.Mui-focused': {
      color: '#a78bfa',
    },
  },
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const dispatch = useAppDispatch()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const getRedirectPath = () => {
    const redirect = searchParams?.get('redirect')
    return redirect || '/'
  }

  const onSubmitForm = async (e: FormEvent<Element>) => {
    try {
      e.preventDefault()

      await dispatch(login({ email, password }))

      router.push(getRedirectPath())
    } catch (e) {
      console.log('error', e)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle())
      router.push(getRedirectPath())
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
      <form className="flex flex-col gap-5" onSubmit={onSubmitForm}>
        <TextField
          inputProps={{
            'data-testid': 'email-input',
          }}
          label="Email"
          value={email}
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
          sx={textFieldSx}
        />
        <TextField
          inputProps={{
            'data-testid': 'password-input',
          }}
          label="Password"
          value={password}
          type="password"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
          sx={textFieldSx}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          Login
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-sm text-white/40">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

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
