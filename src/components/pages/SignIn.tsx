import React from 'react'
// import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Container, Typography, TextField, Button, Link
  // , FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton
} from '@mui/material'
import { Link as LinkRouter } from 'react-router-dom'

// interface Props {
//   testProp1?: boolean
//   testProp2?: string
//   testProp3?: number
//   testProp4?: string[]
//   testProp5?: () => void
// }

const SignIn: React.FC = () => {
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

      <TextField
        required
        id="outlined-required"
        label="Email Address"
        variant="outlined"
        sx={{ width: '100%', m: 2 }}
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
        type="password"
        autoComplete="current-password"
        sx={{ width: '100%', m: 2 }}
      />
      <Button variant="contained" sx={{ width: '100%', m: 2 }}>
        Sign in
      </Button>
      <Link component={LinkRouter} to="/sign_up" underline="none">
        {"Don't have an account? Sign up"}
      </Link>
    </Container>
  )
}

export default SignIn
