import React, { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { MdAccountCircle, MdAdd } from 'react-icons/md'

import { useNavigate, Link } from 'react-router-dom'

import { Ticket, mapTicketPriority, mapTicketStatus, mapTicketType } from '../models/Ticket'

function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.reload()
}



export const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])

  async function getAllTickets() {
    fetch('https://backend-bugtracker-eu.herokuapp.com/api/ticket', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`
      }
    })
      .then(res => res.json())
      .then(res => {
        setTickets(res.ticket)
      }
      )
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllTickets()
    }
    fetchData()
  }, [])






  return (
    <div className='container'>
      <div className='grid'>
        <nav>
          <ul>
            <li><strong>Dashboard</strong></li>
          </ul>
          <ul>
            <li>
              <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="button"><MdAccountCircle /></summary>
                <ul role="listbox">
                  <li><Link to={"/account"}>My Account</Link></li>
                  <li><button onClick={logout} className="outline">Logout</button></li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>

      </div>

      <button onClick={() => {
        navigate('/tickets/new')
      }
      }><MdAdd />New Ticket</button>
      <table role={"grid"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Topic</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        {tickets.map((ticket: Ticket) => {
          return (
            <tbody key={ticket.id}>
              <tr>
                <td>{ticket.id}</td>
                <td><Link to={"/ticket/" + ticket.id}>{ticket.topic}</Link></td>
                <td>{mapTicketPriority(ticket.priority)}</td>
                <td>{mapTicketType(ticket.type)}</td>
                <td>{mapTicketStatus(ticket.status)}</td>
              </tr>
            </tbody>

          )

        })}</table>

    </div>

  )
}

export default Dashboard