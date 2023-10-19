import { Container, Typography, TextField, Button, Link } from '@mui/material'
import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'

const SignUp: React.FC = () => {
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

      <TextField
        required
        id="outlined-required"
        label="First Name"
        variant="outlined"
        sx={{ width: '100%', m: 2 }}
      />
      <TextField
        required
        id="outlined-required"
        label="Last Name"
        variant="outlined"
        sx={{ width: '100%', m: 2 }}
      />
      <TextField
        required
        id="outlined-required"
        label="Email Address"
        variant="outlined"
        sx={{ width: '100%', m: 2 }}/>
      <TextField
        required
        id="outlined-required"
        label="Password"
        type="password"
        autoComplete="current-password"
        sx={{ width: '100%', m: 2 }}
      />
      <TextField
        required
        id="outlined-required"
        label="Confirm password"
        type="password"
        autoComplete="current-password"
        sx={{ width: '100%', m: 2 }}
      />
      <Button variant="contained" sx={{ width: '100%', m: 2 }}>Sign up</Button>
        <Link component={LinkRouter} to="/" underline="none">
          {'Already have an account? Sign in'}
        </Link>
    </Container>
  )
}

export default SignUp
