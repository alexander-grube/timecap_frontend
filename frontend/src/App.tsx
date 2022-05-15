import './App.css'
import { Login } from './components/Login'
import Error from './components/Error'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function isLoggedIn() {
  return document.cookie.includes('token')
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
