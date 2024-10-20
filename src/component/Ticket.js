import React, { useState, useEffect } from 'react';
import ticket from '../assets/img/8381729466507_.pic.jpg';
import './Ticket.css';

export default function Ticket() {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }));
    const [expiry, setExpiry] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }));
        }, 1000);

        const currentDate = new Date();
        const expiryDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
        setExpiry(`Expires ${expiryDate.toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: '2-digit', year: 'numeric' })} at ${expiryDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true })}`);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="ticket-container">
            <img src={ticket} alt="Ticket"/>
            <div className="time-display">{time}</div>
            <div className="bus-info">
                <span className="bus-number">Bus 747 x 1</span>
            </div>
            <div className="ticket-details">
                <p className="ticket-location">YUL Aéroport Mtl-Trudeau x 1 personne</p>
                <p className="ticket-city">Montreal, QC</p>
                <p className="ticket-expiry">{expiry}</p>
            </div>
        </div>
    );
}