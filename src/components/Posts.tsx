import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Container, Stack, Typography, Link } from '@mui/material'
import { networkApi } from '../Redux/networkApi'
import Post, { type PostProps } from './Post'
import { Link as LinkRouter } from 'react-router-dom'
import PostForm from './PostForm'
import PostFormUnauth from './PostFormUnauth'
import { useAppDispatch } from '../Redux/store'
import { setCredentials } from '../Redux/slices/authSlice'

const Posts: React.FC = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))

  const dispatch = useAppDispatch()
  const { data = [], isLoading, error } = networkApi.useGetPostsQuery(''/* { pollingInterval: 3000 } */)

  useEffect(() => {
    const user = localStorage.getItem('User')
    if (user !== null) {
      dispatch(setCredentials({
        user: JSON.parse(user),
        accessToken: localStorage.getItem('Token')
      }))
    }
  }, [])

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
        {(error != null) ? <PostFormUnauth/> : <PostForm/> }

        {isLoading && <h2>Loading...{isLoading}</h2>}
        {(error != null) && <h2>Error:{isError()}
          Please,
          <Link component={LinkRouter} to="/signin" underline="none">
          {' login '}
          </Link>
          or
          <Link component={LinkRouter} to="/signup" underline="none">
          {' register'}
          </Link>
        </h2>}
        <ul style={{ padding: '0' }}>
            {[...data].reverse().map(post => (
              <Item
                key={post.id}
                elevation={12}
                sx={{ mb: 2 }}
                // {...usersData?.find(user => user?.id === post.userId)}
              >
                <Post post={post as PostProps} /* user={user as User} *//>
              </Item>
            )
            )}
        </ul>
      </Stack>
    </Container>
  )
}

export default Posts
