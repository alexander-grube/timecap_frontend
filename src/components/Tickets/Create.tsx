import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TicketPriority, TicketStatus, TicketType } from "../../models/Ticket";

type TicketRequest = {
    ticket: {
        topic: string,
        priority: number,
        type: number,
        status: number,
        description: string
    }
}

export const CreateTicket: FunctionComponent = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [priority, setPriority] = useState(TicketPriority.Low);
    const [type, setType] = useState(TicketType.Feature);
    const [status, setStatus] = useState(TicketStatus.New);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    function handleTicketCreation(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        console.log(topic, priority, type, status, description);

        let request: TicketRequest = {
            ticket: {
                topic: topic,
                priority: priority,
                type: type,
                status: status,
                description: description
            }
        }

        fetch('https://backend-bugtrack.alexgrube.dev/api/ticket/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
            body: JSON.stringify(request)
        }).then(res => res.json()).then(res => {
            console.log(res);
        }
        ).catch(err => {
            console.log(err);
        }
        ).finally(() => {
            setLoading(false);
            navigate("/");
        });
    }

    return (
        <div className="container">
            <div>Create Ticket</div>
            <div>
                <label>Topic:</label>
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />

                <label>Priority:</label>
                <select value={priority} onChange={(e) => setPriority(parseInt(e.target.value))}>
                    <option value={TicketPriority.Low}>Low</option>
                    <option value={TicketPriority.Medium}>Medium</option>
                    <option value={TicketPriority.High}>High</option>
                </select>

                <label>Type:</label>
                <select value={type} onChange={(e) => setType(parseInt(e.target.value))}>
                    <option value={TicketType.Feature}>Feature</option>
                    <option value={TicketType.Bug}>Bug</option>
                    <option value={TicketType.Other}>Other</option>
                </select>

                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
                    <option value={TicketStatus.New}>New</option>
                    <option value={TicketStatus.Open}>Open</option>
                    <option value={TicketStatus.InProgress}>In Progress</option>
                    <option value={TicketStatus.Resolved}>Resolved</option>
                </select>

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <button onClick={handleTicketCreation} aria-busy={loading}>{loading ? "" : "Create"}</button>
            </div>
        </div>
    )
}