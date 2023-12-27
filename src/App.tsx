import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
// import NotFoundPage from './components/pages/NotFoundPage'
import { Typography, Toolbar, AppBar } from '@mui/material'
import Posts from './components/Posts/Posts'
import UserName from './components/UserName'

const App: React.FC = () => (
  <div className="App">
    <AppBar>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6">
          Social Network
        </Typography>
        <UserName />
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path="/" element={<Posts />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      {/* <Route path="*" element={<NotFoundPage />}/> */}
    </Routes>
  </div>
)

export default App
