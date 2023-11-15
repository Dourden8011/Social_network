import React from 'react'
// import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Container, Typography, TextField, Button, Link
  // , FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton
} from '@mui/material'
import { Link as LinkRouter } from 'react-router-dom'
import { useAuthUserMutation } from '../../Redux/networkApi'
// import { useAppDispatch } from '../../Redux/store'
import { setCredentials } from '../../Redux/slices/authSlice'
import { useAppDispatch } from '../../Redux/store'

// interface Props {
//   testProp1?: boolean
//   testProp2?: string
//   testProp3?: number
//   testProp4?: string[]
//   testProp5?: () => void
// }

// const handleSubmit

const SignIn: React.FC = () => {
  const [authUser] = useAuthUserMutation()
  const dispath = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('Email Address') as string
    const password = formData.get('Password') as string
    const data = await authUser({
      email,
      password
    }).unwrap()

    dispath(setCredentials({
      user: data.user,
      accessToken: data.accessToken
    }))
  }

  return (
    <Container sx = {{
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
        required
        name='Email Address'
        autoComplete="@gmail.com"
        label="Email Address"
        variant="outlined"
        sx={{ width: '100%', m: 2 }}
      />
      <TextField
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
