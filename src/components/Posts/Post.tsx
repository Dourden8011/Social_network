import React, { type FormEvent, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { networkApi } from '../../Redux/networkApi'
import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import { useAppSelector } from '../../Redux/store'
import Votes from '../Votes'

export interface PostProps {
  id: string
  title: string
  body: string
  userId: string
  date: string
  likes: string[]
}

interface PostItem {
  post: PostProps
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const Post: React.FC<PostItem> = ({ post }: PostItem) => {
  const [deletePost] = networkApi.useDeletePostMutation()
  const [editPost] = networkApi.useEditPostMutation()

  const [open, setOpen] = React.useState(false)

  const handleClose = (): void => {
    setOpen(false)
  }

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
      userId: post.userId,
      date: ` edit: ${new Date().toLocaleString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })}`
    })
  }

  const [active, setActive] = useState(false)

  const user = useAppSelector(state => state.auth.user)

  const usersData = networkApi.useGetUsersQuery('').data

  const findName = (post: PostProps): string => {
    const user = usersData?.find((user: { id: string }) => user.id === post.userId)
    return user?.firstname as string
  }

  if (!active) {
    return (

      <li style={{ listStyle: 'none' }}>
        <Box style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Grid ml={2}>
            <b>{findName(post)}</b>
            {post.date}
          </Grid>
          {(user?.id === post.userId) &&
            <Box>
              <DeleteOutlinedIcon style={{ float: 'right' }} onClick={() => {
                void handleDelete(post)
              }} />
              <EditOutlinedIcon style={{ float: 'right' }}
                onClick={() => {
                  setActive(true)
                  setOpen(true)
                }}
              />
            </Box>
          }
        </Box>
        <h2>{post.title}</h2>
        <Grid>{post.body}</Grid>
        <Votes post={post}/>
      </li>

    )
  } else {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
      <li style={{ listStyle: 'none' }}>
        <h3 style={{ float: 'left' }}>
          <Box ml={2}>
            {findName(post)}
            {post.date}
          </Box>
        </h3>
        <Box sx={style}>
        <form name="editForm" onSubmit={event => {
          void handleEdit(event)
          setActive(false)
        }}>
          <TextField
            name='title'
            variant="filled"
            placeholder={post.title}
            sx={{ width: '92%', m: 1 }}
            defaultValue={post.title}
            onFocus={e => {
              e.target.select()
            }} />

          <TextField
            name='body'
            variant="filled"
            placeholder={post.body}
            sx={{ width: '92%', m: 1 }}
            defaultValue={post.body}
            onFocus={e => {
              e.target.select()
            }} />
          <Box sx={{ '& button': { m: 1 } }}>
            <Button
              type='submit'
              variant="contained"
              sx={{ width: '45%' }}
            >
              <DoneOutlineOutlinedIcon />
            </Button>

            <Button
            type='button'
            variant="contained"
            sx={{ width: '45%' }}
            onClick = {() => { setActive(false) }}
            >
              <CancelIcon/>
            </Button>
          </Box>

        </form>
        </Box>
      </li>

      </Modal>
    )
  }
}

export default Post
