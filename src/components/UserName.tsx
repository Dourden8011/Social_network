import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/store'
import LogoutIcon from '@mui/icons-material/Logout'
import { logOut } from '../Redux/slices/authSlice'
import { networkApi } from '../Redux/networkApi'

const UserName: React.FC = () => {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const handleLogOut = (): void => {
    dispatch(logOut())
    dispatch(networkApi.util.resetApiState())
  }
  if (user !== null) {
    return (
      <Stack direction='row' spacing={1}>
        <Typography variant="h6">
        {user?.firstname}
        <Button onClick={handleLogOut}
        sx={{ m: 2 }}
        variant="contained"
        startIcon={<LogoutIcon />}>
        logout
        </Button>
        </Typography>
      </Stack>
    )
  }
}

export default UserName
