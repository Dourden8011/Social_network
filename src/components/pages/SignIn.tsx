import React, { useState } from 'react'
import { Container, Typography, TextField, Button, Link } from '@mui/material'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { useAuthUserMutation } from '../../Redux/networkApi'
import { setCredentials } from '../../Redux/slices/authSlice'
import { useAppDispatch } from '../../Redux/store'

const SignIn: React.FC = () => {
  const [authUser] = useAuthUserMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [errEmail, setErrEmail] = useState({
    error: false,
    helperText: ''
  })

  const [errPassword, setErrPassword] = useState({
    error: false,
    helperText: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('Email Address') as string
    const password = formData.get('Password') as string

    try {
      const data = await authUser({
        email,
        password
      }).unwrap()

      dispatch(setCredentials({
        user: data.user,
        accessToken: data.accessToken
      }))
      localStorage.setItem('Token', data.accessToken)
      localStorage.setItem('User', JSON.stringify(data.user))
      navigate('/')
    } catch (error) {
      if (isError(error) === '"Cannot find user"') {
        setErrEmail({
          error: true,
          helperText: isError(error)
        })
      } else if (isError(error) === '"Email format is invalid"') {
        setErrEmail({
          error: true,
          helperText: isError(error)
        })
      } else {
        setErrPassword({
          error: true,
          helperText: isError(error)
        })
      }
    }
  }

  const isError = (error: any): any => {
    if (error != null) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        return errMsg
      } else {
        const errMsg = error.message
        return errMsg
      }
    }
  }

  return (
    <Container sx={{
      marginTop: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '50ch'
    }}
    >
      <Typography variant="h6">
        Sign in
      </Typography>
      <form onSubmit={event => {
        void handleSubmit(event)
      }}>
        <TextField
          onChange={() => {
            setErrEmail({
              error: false,
              helperText: ''
            })
            setErrPassword({
              error: false,
              helperText: ''
            })
          }}
          error={errEmail.error}
          helperText={errEmail.helperText}
          required
          name='Email Address'
          autoComplete="@gmail.com"
          label="Email Address"
          variant="outlined"
          sx={{ width: '100%', m: 2 }}
        />
        <TextField
          onChange={() => {
            setErrEmail({
              error: false,
              helperText: ''
            })
            setErrPassword({
              error: false,
              helperText: ''
            })
          }}
          error={errPassword.error}
          helperText={errPassword.helperText}
          required
          name='Password'
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ width: '100%', m: 2 }}
        />
        <Button
          variant="contained"
          sx={{ width: '100%', m: 2 }}
          type='submit'
        >
          Sign in
        </Button>
      </form>
      <Link component={LinkRouter} to="/signup" underline="none">
        {"Don't have an account? Sign up"}
      </Link>
      <Link component={LinkRouter} to="/" underline="none">
        {'Go to posts page'}
      </Link>
    </Container>
  )
}

export default SignIn
