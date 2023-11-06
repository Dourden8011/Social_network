import React from 'react'
import type { PostObj } from './Posts'

interface Props {
  post: PostObj
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <li>
      <h3>{post.id}</h3>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </li>
  )
}

export default Post
