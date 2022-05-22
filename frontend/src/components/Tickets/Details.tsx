import { FunctionComponent, useState, useEffect } from "react";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import { useParams } from "react-router-dom";
import { mapAccountRole } from "../../models/Account";
import { mapTicketPriority, mapTicketStatus, mapTicketType, Ticket } from "../../models/Ticket";

export const TicketDetails: FunctionComponent = () => {

    const { id } = useParams();

    const [ticket, setTicket] = useState<Ticket>({} as Ticket);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://backend-bugtracker-eu.herokuapp.com/api/ticket/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then(res => res.json()).then(res => {
            setTicket(res.ticket);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    function getUserInfo(ticket: Ticket) {
        return ticket?.account?.firstname + " " + ticket?.account?.lastname + " (" + mapAccountRole(ticket?.account?.role) + ")";
    }

    function activateEditMode() {
        setEditMode(true);
    }

    function updateTicket() {
        setLoading(true);
        setEditMode(false);
        fetch(`https://backend-bugtracker-eu.herokuapp.com/api/ticket/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
            body: JSON.stringify({
                ticket: {
                    topic: ticket.topic,
                    priority: ticket.priority,
                    type: ticket.type,
                    status: ticket.status,
                    description: ticket.description
                }
            })
        }).then(res => res.json()).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
        setTicket(ticket);
    }


    return (
        <div className="container">
            {loading ? <article aria-busy="true"></article> : (
                <article>
                    <header>
                        <nav>
                            <ul>
                                <li><strong>Ticket Details</strong></li>
                            </ul>
                            <ul>
                                <li>{!editMode ? <button onClick={activateEditMode} className="outline"><MdEdit /> Edit Ticket</button> : null}</li>
                                <li>{!editMode ? <button className="outline negative"><MdDelete /> Delete Ticket</button> : null}</li>
                            </ul>
                        </nav>
                        <label>Topic:</label>
                        {editMode ? <input type="text" value={ticket.topic} onChange={(e) => setTicket({ ...ticket, topic: e.target.value })} /> : <input type="text" value={ticket.topic} readOnly />}
                        
                    </header>

                    <div>
                        <label>Assigned to:</label>
                        <input type="text" value={getUserInfo(ticket)} readOnly />
                    </div>
                    <div className="grid">
                        <label>Priority:</label>
                        {editMode ? (
                            <select value={ticket.priority} onChange={(e) => setTicket({ ...ticket, priority: parseInt(e.target.value) })}>
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        ) : <input type="text" value={mapTicketPriority(ticket.priority)} readOnly />}

                        <label>Type:</label>
                        {editMode ? (
                            <select value={ticket.type} onChange={(e) => setTicket({ ...ticket, type: parseInt(e.target.value) })}>
                                <option value={3}>Feature</option>
                                <option value={2}>Bug</option>
                                <option value={1}>Other</option>
                            </select>
                        ) : <input type="text" value={mapTicketType(ticket.type)} readOnly />}

                        <label>Status:</label>
                        {editMode ? (
                            <select value={ticket.status} onChange={(e) => setTicket({ ...ticket, status: parseInt(e.target.value) })}>
                                <option value={1}>New</option>
                                <option value={2}>Open</option>
                                <option value={3}>In Progress</option>
                                <option value={4}>Resolved</option>
                            </select>
                        ) : <input type="text" value={mapTicketStatus(ticket.status)} readOnly />}
                    </div>


                    <label>Description:</label>
                    {editMode ? <textarea value={ticket.description} onChange={(e) => setTicket({ ...ticket, description: e.target.value })} /> : <textarea value={ticket.description} readOnly />}

                    <nav>
                        <ul>
                            <li>{editMode ? <button onClick={updateTicket} className="outline"><MdUpdate /> Update Ticket</button> : null}</li>
                        </ul>
                    </nav>

                </article>
            )}

        </div>
    )
}