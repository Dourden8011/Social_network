import React from 'react'
import { Link } from 'react-router-dom'
// import { Homepage } from "./Homepage"

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ marginTop: '100px' }}>Page not found</h1>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default NotFoundPage
