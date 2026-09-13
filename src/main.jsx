import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AreaProvider } from './context/AreaContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AreaProvider>
        <App />
      </AreaProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
