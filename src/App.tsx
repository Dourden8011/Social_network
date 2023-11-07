import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import NotFoundPage from './components/pages/NotFoundPage'
import { Typography, Toolbar, AppBar } from '@mui/material'
import Posts from './components/Posts'

const App: React.FC = () => (
  <div className="App">
    <AppBar>
      <Toolbar>
        <Typography variant="h6">
          Social Network
        </Typography>
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path="/" element={<Posts />}/>
      <Route path="/sign_in" element={<SignIn />}/>
      <Route path="/sign_up" element={<SignUp />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  </div>
)

export default App
