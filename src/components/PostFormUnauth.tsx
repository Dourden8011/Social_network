import { Button, TextField } from '@mui/material'
import React from 'react'

const PostFormUnauth: React.FC = () => {
  return (
    <form>
      <TextField
        disabled
        name='title'
        required
        id="outlined-required"
        label="title"
        sx={{ width: '100%', mb: 2 }}
      />
      <TextField
        disabled
        name='body'
        id="outlined-multiline-flexible"
        label="Description"
        multiline
        maxRows={10}
        sx={{ width: '100%', mb: 2 }}
      />
      <Button
        type='submit'
        variant="contained" disabled
        sx={{ width: '100%' }}
      >
        Submit
      </Button>
    </form>
  )
}

export default PostFormUnauth
