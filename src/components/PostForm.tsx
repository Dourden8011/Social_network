import { Button, TextField } from '@mui/material'
import React, { type FormEvent } from 'react'
import { networkApi } from '../Redux/networkApi'
import { useAppSelector } from '../Redux/store'

const PostForm: React.FC = () => {
  const [newPost] = networkApi.useNewPostMutation()
  const user = useAppSelector(state => state.auth.user)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const title = formData.get('title') as string
    const body = formData.get('body') as string
    event.currentTarget?.reset()

    await newPost({
      id: '',
      title,
      body,
      userId: user?.id,
      date: ` send: ${new Date().toLocaleString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })}`
    })
  }
  return (
    <form onSubmit={e => {
      void handleSubmit(e)
    }}>
      <TextField
        name='title'
        required
        id='title'
        autoComplete='off'
        label="Title"
        sx={{ width: '100%', mb: 2 }}
      />
      <TextField
        required
        name='body'
        id='body'
        autoComplete='off'
        label="Description"
        multiline
        maxRows={10}
        sx={{ width: '100%', mb: 2 }}
      />
      <Button
        type='submit'
        variant="contained"
        sx={{ width: '100%' }}
      >
        Submit
      </Button>
    </form>
  )
}

export default PostForm
