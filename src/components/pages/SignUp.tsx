import { Container, Typography, TextField, Button, Link } from '@mui/material'
import React, { useState } from 'react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { networkApi } from '../../Redux/networkApi'
import { useAppDispatch } from '../../Redux/store'
import { setCredentials } from '../../Redux/slices/authSlice'

const SignUp: React.FC = () => {
  const [newUser] = networkApi.useNewUserMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [errConfirm, setErrConfirm] = useState({
    error: false,
    helperText: ''
  })

  const [errPassword, setErrPassword] = useState({
    error: false,
    helperText: ''
  })

  const [errEmail, setErrEmail] = useState({
    error: false,
    helperText: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const firstname = formData.get('First Name') as string
    const lastname = formData.get('Last Name') as string
    const email = formData.get('Email Address') as string
    const password = formData.get('Password') as string
    const confirmPassword = formData.get('Confirm password') as string
    if (password === confirmPassword) {
      try {
        const data = await newUser({
          id: '',
          firstname,
          lastname,
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
        if (isError(error) === '"Email format is invalid"') {
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
    } else {
      setErrConfirm({
        error: true,
        helperText: 'Password confirmation does not match'
      })
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
    <Container
      sx={{
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50ch'
      }}
    >
      <Typography variant="h6">
        Sign up
      </Typography>
      <form onSubmit={(event) => {
        void handleSubmit(event)
      }}>
        <TextField
          required
          name='First Name'
          label="First Name"
          variant="outlined"
          sx={{ width: '100%', m: 2 }}
        />
        <TextField
          required
          name='Last Name'
          label="Last Name"
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
            setErrConfirm({
              error: false,
              helperText: ''
            })
          }}
          error={errEmail.error}
          helperText={errEmail.helperText}
          required
          name='Email Address'
          label="Email Address"
          autoComplete="@gmail.com"
          variant="outlined"
          sx={{ width: '100%', m: 2 }} />
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
            setErrConfirm({
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
            setErrConfirm({
              error: false,
              helperText: ''
            })
          }}
          error={errConfirm.error}
          helperText={errConfirm.helperText}
          required
          name='Confirm password'
          label="Confirm password"
          type="password"
          autoComplete="current-password"
          sx={{ width: '100%', m: 2 }}
        />
        <Button
          variant="contained"
          sx={{ width: '100%', m: 2 }}
          type='submit'
        >
          Sign up
        </Button>
      </form>
      <Link component={LinkRouter} to="/signin" underline="none">
        {'Already have an account? Sign in'}
      </Link>
    </Container>
  )
}

export default SignUp
