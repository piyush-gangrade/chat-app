import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserProvider from './context/UserContext.jsx'
import './index.css'

const root = document.getElementById('root');
const rootRouter = ReactDOM.createRoot(root);
rootRouter.render(
  <React.StrictMode>
    <UserProvider>
      <App /> 
    </UserProvider>
  </React.StrictMode>
)
