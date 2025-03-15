import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
createRoot(document.getElementById('root')).render(

  <AdminProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </AdminProvider>



)
