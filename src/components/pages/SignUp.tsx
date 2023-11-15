import { Container, Typography, TextField, Button, Link } from '@mui/material'
import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { networkApi } from '../../Redux/networkApi'

const SignUp: React.FC = () => {
  const [newUser] = networkApi.useNewUserMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const firstname = formData.get('First Name') as string
    const lastname = formData.get('Last Name') as string
    const email = formData.get('Email Address') as string
    const password = formData.get('Password') as string
    const confirmPassword = formData.get('Password') as string
    if (password === confirmPassword) {
      await newUser({
        id: '',
        firstname,
        lastname,
        email,
        password
      })
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
        required
        name='Email Address'
        label="Email Address"
        autoComplete="@gmail.com"
        variant="outlined"
        sx={{ width: '100%', m: 2 }}/>
      <TextField
        required
        name='Password'
        label="Password"
        type="password"
        autoComplete="current-password"
        sx={{ width: '100%', m: 2 }}
      />
      <TextField
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
