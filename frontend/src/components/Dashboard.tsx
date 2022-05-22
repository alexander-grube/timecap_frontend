import React, { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { MdAdd } from 'react-icons/md'

import { useNavigate, Link } from 'react-router-dom'

import { Ticket, mapTicketPriority, mapTicketStatus, mapTicketType } from '../models/Ticket'





export const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)

  async function getAllTickets() {
    setLoading(true)
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
      ).finally(() => {
        setLoading(false)
      })
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
          
        </nav>

      </div>

      <button onClick={() => {
        navigate('/tickets/new')
      }
      }><MdAdd />New Ticket</button>
      {
        loading ? <article aria-busy="true"></article> : <table role={"grid"}>
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
      }
      

    </div>

  )
}

export default Dashboard