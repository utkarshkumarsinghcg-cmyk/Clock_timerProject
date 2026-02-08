import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getGreeting = () => {
        // Get hour in IST
        const istDate = new Date(time.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const hour = istDate.getHours();

        if (hour < 5) return "Pulling an all-nighter? ☕";
        if (hour < 12) return "Good Morning! Ready to learn? ☀️";
        if (hour < 18) return "Afternoon Grind. Keep going! 🚀";
        return "Late Night Study Session. 🌙";
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                {getGreeting()}
            </div>
            <div style={{
                fontSize: '6rem',
                fontWeight: '700',
                letterSpacing: '5px',
                textShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                marginBottom: '1rem'
            }}>
                {formatTime(time)}
            </div>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                {formatDate(time)}
            </div>
        </div>
    );
};

export default Clock;
