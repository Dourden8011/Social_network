import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../Redux/store'
import { type PostProps } from './Posts/Post'
import { type Vote, useGetVotesQuery, useNewVoteMutation } from '../Redux/networkApi'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

interface PostItem {
  post: PostProps
}

const Votes: React.FC<PostItem> = ({ post }) => {
  const [newVote] = useNewVoteMutation()
  const { data } = useGetVotesQuery('')
  const uId = useAppSelector(state => state.auth.user?.id)
  const [vote, useVote] = useState(false)

  useEffect(() => {
    if (findPost(post).findIndex(el => el.user_id === uId) >= 0) {
      useVote(true)
    }
  })

  const findPost = (post: PostProps): Vote[] => {
    if (data == null) return []
    return data?.filter(p => p.post_id === post.id)
  }

  const handleLike = async (a: string | undefined): Promise<void> => {
    if (a == null) return
    await newVote({
      user_id: a,
      post_id: post.id
    })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      spacing: 2,
      ml: 2
    }}>
      {(!vote)
        ? <FavoriteBorderIcon onClick={() => {
          void handleLike(uId)
          findPost(post)
        }}
        sx={{ mr: 1 }}/>
        : <FavoriteIcon sx={{ mr: 1 }}/>}
            {(findPost(post).length === 0)
              ? <Typography variant="subtitle1" gutterBottom >
          no votes yet
        </Typography>
              : (findPost(post).length === 1)
                  ? <Typography variant="subtitle1" gutterBottom >
            {findPost(post).length} vote
          </Typography>
                  : <Typography variant="subtitle1" gutterBottom >
            {findPost(post).length} votes
          </Typography>}
    </Box>
  )
}

export default Votes
