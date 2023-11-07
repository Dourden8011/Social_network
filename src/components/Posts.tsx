import React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import Post from './Post'
import { useAppDispatch, useAppSelector } from './hooks'
import { addPost } from './slices/postsSlice'

const Posts: React.FC = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  const dispatch = useAppDispatch()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get('title') as string
    const body = formData.get('body') as string

    dispatch(addPost({
      id: '',
      title,
      body
    }))

    e.currentTarget.reset()
  }

  const posts = useAppSelector((state) => state.posts.posts)

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250ch'
      }}
    >
      <Stack
        spacing={2}
        sx={{ width: '70%' }}
      >
        <Typography variant="h6">
          New Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name='title'
            required
            id="outlined-required"
            label="title"
            sx={{ width: '100%', mb: 2 }}
          />
          <TextField
            required
            name='body'
            id="outlined-multiline-flexible"
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
        <ul style={{ padding: '0' }}>
          <Item>
            {[...posts].reverse().map(post => (
              <Post key={post.id}
              post={post}/>)
            )}
          </Item>
        </ul>
      </Stack>
    </Container>
  )
}

export default Posts
