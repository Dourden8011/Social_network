import { Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../Redux/store'

const UserName: React.FC = () => {
  const user = useAppSelector(state => state.auth.user)
  return (
    <Typography variant="h6">
          {user?.firstname}
    </Typography>
  )
}

export default UserName
