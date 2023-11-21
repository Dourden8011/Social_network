import React, { type FormEvent, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { networkApi } from '../Redux/networkApi'
import { Box, Button, TextField } from '@mui/material'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'

export interface PostProps {
  id: string
  title: string
  body: string
  userId: string
}

interface PostItem {
  post: PostProps
}

const Post: React.FC<PostItem> = ({ post }: PostItem) => {
  const [deletePost] = networkApi.useDeletePostMutation()
  const [editPost] = networkApi.useEditPostMutation()

  const handleDelete = async (post: PostProps): Promise<void> => {
    await deletePost(post)
  }
  const handleEdit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const title = formData.get('title') as string
    const body = formData.get('body') as string

    await editPost({
      id: post.id,
      title,
      body,
      userId: post.userId
    })
  }

  const [active, setActive] = useState(false)

  if (!active) {
    return (
      <li style={{ listStyle: 'none' }}>
        <h3 style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Box ml={2}>
            {post.userId}
          </Box>
          <Box>
          <DeleteOutlinedIcon style={{ float: 'right' }} onClick={() => {
            void handleDelete(post)
          }}/>
          <EditOutlinedIcon style={{ float: 'right' }}
          onClick={() => {
            setActive(true)
          }}
          />
          </Box>
        </h3>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </li>
    )
  } else {
    return (
      <li style={{ listStyle: 'none' }}>
        <h3 style={{ float: 'left' }}>
          <Box ml={2}>
            {post.userId}
          </Box>
        </h3>
        <form name="editForm" onSubmit={event => {
          void handleEdit(event)
          setActive(false)
        }}>
          <h2><TextField
          name='title'
          variant="filled"
          placeholder={post.title}
          sx={{ width: '100%' }}
          defaultValue={post.title}
          onFocus={e => {
            e.target.select()
          }}/>
          </h2>
          <p><TextField
          name='body'
          variant="filled"
          placeholder={post.body}
          sx={{ width: '100%' }}
          defaultValue={post.body}
          onFocus={e => {
            e.target.select()
          }}/>
          </p>
          <Button
          type='submit'
          variant="contained"
          sx={{ width: '100%' }}
          >
          <DoneOutlineOutlinedIcon />
        </Button>
      </form>
      </li>
    )
  }
}

export default Post
