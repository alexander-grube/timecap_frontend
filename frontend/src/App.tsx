import './App.css'
import { Login } from './components/Login'
import Error from './components/Error'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { CreateTicket } from './components/Tickets/Create'
import { TicketDetails } from './components/Tickets/Details'
import { MdAccountCircle, MdDarkMode, MdLogout, MdWbSunny } from 'react-icons/md'
import { useState } from 'react'
import { MyAccount } from './components/Accounts/MyAccount'

function isLoggedIn() {
  return document.cookie.includes('token')
}

function getThemeValue() {
  if (localStorage.getItem('theme') === 'dark') {
    return 'dark'
  }
  if (localStorage.getItem('theme') === 'light') {
    return 'light'
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}




function App() {

  // get darkmode from prefer-color-scheme

  let modeValue = getThemeValue()

  const [mode, setMode] = useState(getThemeValue())

  document.getElementsByTagName('html')[0].setAttribute('data-theme', modeValue)
  function changeMode() {
    if (mode === 'dark') {
      setMode('light')
      modeValue = 'light'
      localStorage.setItem('theme', 'light')
      document.getElementsByTagName('html')[0].setAttribute('data-theme', modeValue)
    } else {
      setMode('dark')
      modeValue = 'dark'
      localStorage.setItem('theme', 'dark')
      document.getElementsByTagName('html')[0].setAttribute('data-theme', modeValue)
    }
  }

  function logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.reload()
  }

  function toMyAccount() {
    window.location.href = '/#/account'
  }

  return (
    <Router>
      <div className='container'>
        <nav>
          <ul>
            <li><Link to={"/"}>Bug Tracker</Link></li>
            {mode === 'dark' ? <li><MdWbSunny onClick={changeMode} className="clickable" /></li> : <li><MdDarkMode onClick={changeMode} className="clickable" /></li>}
          </ul>
          {isLoggedIn() ? (
            <ul>
              <li><button onClick={toMyAccount} className="outline"><MdAccountCircle /> My Account</button></li>
              <li><button onClick={logout} className="outline secondary"><MdLogout /> Logout</button></li>
            </ul>
          ) : (<div></div>)}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Login />} />
        <Route path="/tickets/new" element={isLoggedIn() ? <CreateTicket /> : <Login />} />
        <Route path="/ticket/:id" element={isLoggedIn() ? <TicketDetails /> : <Login />} />
        <Route path="/account" element={isLoggedIn() ? <MyAccount /> : <Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
