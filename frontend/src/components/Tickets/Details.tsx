import { FunctionComponent, useState, useEffect } from "react";
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


    return (
        <div className="container">
            <div>Ticket Details</div>
            <div>
                <label>User:</label>
                {ticket.account.firstname} {ticket.account.lastname} ({mapAccountRole(ticket.account.role)})
            </div>
            <div>
                <label>Topic:</label>
                {ticket.topic}

                <label>Priority:</label>
                {mapTicketPriority(ticket.priority)}

                <label>Type:</label>
                {mapTicketType(ticket.type)}

                <label>Status:</label>
                {mapTicketStatus(ticket.status)}

                <label>Description:</label>
                {ticket.description}
            </div>

        </div>
    )
}