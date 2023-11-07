import React from 'react'

interface PostProps {
  id: string
  title: string
  body: string
}

interface PostItem {
  post: PostProps
}

const Post: React.FC<PostItem> = ({ post }) => {
  return (
    <li style={{ listStyle: 'none' }}>
      <h3>{post.id}</h3>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </li>
  )
}

export default Post
