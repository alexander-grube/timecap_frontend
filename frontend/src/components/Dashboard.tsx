import React, { FunctionComponent } from 'react'
import { useState, useEffect } from 'react'

import { Ticket, mapTicketPriority, mapTicketStatus, mapTicketType } from '../models/Ticket'
import { Account } from '../models/Account'

function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.reload()
}


export const Dashboard: FunctionComponent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])


  function getAccountByID(accountID: number): Account {
    let account: Account = {
      firstname: '',
      lastname: '',
      email: ''
    };
    fetch(`https://backend-bugtracker-eu.herokuapp.com/api/account/${accountID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('=')[1]}`
      }
    }).then(response => response.json())
      .then(acc => {
        console.log(acc);
        account.firstname = acc.firstname;
        account.lastname = acc.lastname;
        account.email = acc.email;
      });
    return account;
  }

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
        setTickets(res)
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
      <div>Dashboard</div>
      <button onClick={logout}>Logout</button>
      <table >
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
            <tbody key={ticket.ID}>
              <tr>
                <td>{ticket.ID}</td>
                <td>{ticket.Topic}</td>
                <td>{mapTicketPriority(ticket.Priority)}</td>
                <td>{mapTicketType(ticket.Type)}</td>
                <td>{mapTicketStatus(ticket.Status)}</td>
              </tr>
            </tbody>

          )

        })}</table>

    </div>

  )
}

export default Dashboard