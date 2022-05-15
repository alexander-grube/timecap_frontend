import React, { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

type Ticket = {
  ID: number,
  Topic: string,
  Description: string,
  Priority: number,
  Type: number,
  Status: number,
  AccountID: number,
}

enum TicketStatus {
  New = 1,
  Open = 2,
  InProgress = 3,
  Resolved = 4,
}

enum TicketType {
  Other = 1,
  Bug = 2,
  Feature = 3,
}

enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

function mapTicketPriority(priority: number): string {
  switch (priority) {
    case TicketPriority.Low:
      return 'Low'
    case TicketPriority.Medium:
      return 'Medium'
    case TicketPriority.High:
      return 'High'
    default:
      return 'Low'
  }
}

function mapTicketType(type: number): string {
  switch (type) {
    case TicketType.Bug:
      return 'Bug'
    case TicketType.Feature:
      return 'Feature'
    default:
      return 'Other'
  }
}

function mapTicketStatus(status: number): string {
  switch (status) {
    case TicketStatus.New:
      return 'New'
    case TicketStatus.Open:
      return 'Open'
    case TicketStatus.InProgress:
      return 'In Progress'
    case TicketStatus.Resolved:
      return 'Resolved'
    default:
      return 'New'
  }
}

function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.reload()
}

export const Dashboard: FunctionComponent = () => {
  const [tickets, setTickets] = useState([])

  function getAllTickets() {
    // fetch with token
    fetch('https://backend-bug-tracker.herokuapp.com/api/ticket', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`
      }
    })
      .then(res => res.json())
      .then(res => {
        setTickets(res)
      })
  }

  useEffect(() => {
    getAllTickets()
  }, [])



  return (
    <div className='container'>
      <div>Dashboard</div>
      <button onClick={logout}>Logout</button>
      {tickets.map((ticket: Ticket) => {
        return (
          <table key={ticket.ID}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Topic</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Type</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ticket.ID}</td>
                <td>{ticket.Topic}</td>
                <td>{ticket.Description}</td>
                <td>{mapTicketPriority(ticket.Priority)}</td>
                <td>{mapTicketType(ticket.Type)}</td>
                <td>{mapTicketStatus(ticket.Status)}</td>
                <td>{ticket.AccountID}</td>
              </tr>
            </tbody>
          </table>
        )
      })}

    </div>

  )
}

export default Dashboard