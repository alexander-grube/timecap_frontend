import './App.css'
import { Login } from './components/Login'
import Error from './components/Error'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { CreateTicket } from './components/Tickets/Create'
import { TicketDetails } from './components/Tickets/Details'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

function isLoggedIn() {
  return document.cookie.includes('token')
}



function App() {

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
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
