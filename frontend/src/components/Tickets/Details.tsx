import { FunctionComponent, useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { mapAccountRole } from "../../models/Account";
import { mapTicketPriority, mapTicketStatus, mapTicketType, Ticket } from "../../models/Ticket";

export const TicketDetails: FunctionComponent = () => {

    const { id } = useParams();

    const [ticket, setTicket] = useState<Ticket>({} as Ticket);
    const [loading, setLoading] = useState(false);

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
                                <li>
                                    <li><button className="outline"><MdEdit /> Edit Ticket</button></li>
                                    <li><button className="outline negative"><MdDelete /> Delete Ticket</button></li>
                                </li>
                            </ul>
                        </nav>
                        <label>Topic:</label>
                        <input type="text" value={ticket.topic} readOnly />
                    </header>

                    <div>
                        <label>Assigned to:</label>
                        <input type="text" value={getUserInfo(ticket)} readOnly />
                    </div>
                    <div className="grid">
                        <label>Priority:</label>
                        <input type="text" value={mapTicketPriority(ticket.priority)} readOnly />

                        <label>Type:</label>
                        <input type="text" value={mapTicketType(ticket.type)} readOnly />

                        <label>Status:</label>
                        <input type="text" value={mapTicketStatus(ticket.status)} readOnly />
                    </div>


                    <label>Description:</label>
                    <textarea value={ticket.description} readOnly />
                </article>
            )}

        </div>
    )
}