import React, { FormEvent } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { login } from '@/redux/userSlice'
import { useAppDispatch } from '@/redux/store'

const LoginForm = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSubmitForm = async (e: FormEvent<Element>) => {
    try {
      e.preventDefault()

      await dispatch(login({ email, password }))

      router.push('/')
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Paper className="w-full max-w-[400px] p-10 text-center">
      <Typography variant="h5">Login Form</Typography>
      <form className="mt-6 flex flex-col gap-6" onSubmit={onSubmitForm}>
        <TextField
          inputProps={{
            'data-testid': 'email-input',
          }}
          label="Email"
          value={email}
          // autoFocus
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
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
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </Paper>
  )
}

export default LoginForm
