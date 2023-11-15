import React, { type FormEvent } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Button, Container, Stack, TextField, Typography, Link } from '@mui/material'
import { networkApi } from '../Redux/networkApi'
import Post from './Post'
import { Link as LinkRouter } from 'react-router-dom'
import { useAppSelector } from '../Redux/store'

const Posts: React.FC = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  const user = useAppSelector(state => state.auth.user)
  const { data = [], isLoading, error } = networkApi.useGetPostsQuery('')

  const isError = (): string | undefined => {
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

  const [newPost] = networkApi.useNewPostMutation()

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
      userId: user?.id
    })
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250ch',
        mt: '100px'
      }}
    >
      <Stack
        spacing={2}
        sx={{ width: '70%' }}
      >
        <Typography variant="h6">
          New Post
        </Typography>

        <form onSubmit={e => {
          void handleSubmit(e)
        }}>
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
        {isLoading && <h2>Loading...{isLoading}</h2>}
        {(error != null) && <h2>Error:{isError()}
          Please,
          <Link component={LinkRouter} to="/signin" underline="none">
          {' login '}
          </Link>
          or
          <Link component={LinkRouter} to="/signun" underline="none">
          {' register'}
          </Link>
        </h2>}
        <ul style={{ padding: '0' }}>
          <Item elevation={12}>
            {[...data].reverse().map(post => (
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
