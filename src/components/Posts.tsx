import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import Post from './Post'
import { fetchPosts } from '../actions/postActions'

export interface PostObj {
  id: string
  title: string
  body: string
}

export interface ReduxObj {
  dispatch: any
  posts: any
}

const Posts: React.FC<ReduxObj> = ({ dispatch, posts }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))

  const [newPosts, setPosts] = useState<PostObj[]>([])

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get('title') as string
    const body = formData.get('body') as string

    setPosts([
      ...newPosts,
      {
        id: (newPosts.length + 1).toString(),
        title,
        body
      }
    ])
    e.currentTarget.reset()
  }

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
            label="Title"
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
        <ul>
          {posts.reverse().map((item: PostObj) => (
            <Item key={item.id}>
              <Post post={item}/>
            </Item>
          ))}
        </ul>
      </Stack>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: { posts: { posts: any } }) => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps)(Posts)
