import './globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'

import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position='top-right' richColors />
    <App />
  </React.StrictMode>,
)
