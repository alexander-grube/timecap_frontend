import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [priority, setPriority] = useState("1");
    const [type, setType] = useState("3");
    const [status, setStatus] = useState("1");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    function handleTicketCreation(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        console.log(topic, priority, type, status, description);

        let request: TicketRequest = {
            ticket: {
                topic: topic,
                priority: parseInt(priority),
                type: parseInt(type),
                status: parseInt(status),
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
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value={"1"}>Low</option>
                    <option value={"2"}>Medium</option>
                    <option value={"3"}>High</option>
                </select>

                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value={"3"}>Feature</option>
                    <option value={"2"}>Bug</option>
                    <option value={"1"}>Other</option>
                </select>

                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value={"1"}>New</option>
                    <option value={"2"}>Open</option>
                    <option value={"3"}>In Progress</option>
                    <option value={"4"}>Resolved</option>
                </select>

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <button onClick={handleTicketCreation} aria-busy={loading}>{loading ? "" : "Create"}</button>
            </div>
        </div>
    )
}