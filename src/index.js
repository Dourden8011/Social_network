import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import { ThemeProvider } from '@emotion/react';

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
// import { createTheme } from '@mui/material';

// const theme = createTheme({

// })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>

      <App />

  </BrowserRouter>
)
