import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Reminder = () => {
    const [reminders, setReminders] = useState(() => {
        const saved = localStorage.getItem('student-reminders');
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState('');
    const [dateInput, setDateInput] = useState('');

    useEffect(() => {
        localStorage.setItem('student-reminders', JSON.stringify(reminders));
    }, [reminders]);

    const addReminder = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setReminders([
            ...reminders,
            {
                id: Date.now(),
                text: input,
                date: dateInput,
                completed: false
            }
        ]);
        setInput('');
        setDateInput('');
    };

    const toggleComplete = (id) => {
        setReminders(reminders.map(rem =>
            rem.id === id ? { ...rem, completed: !rem.completed } : rem
        ));
    };

    const deleteReminder = (id) => {
        setReminders(reminders.filter(rem => rem.id !== id));
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={addReminder} style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                background: 'var(--bg-secondary)',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)'
            }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add assignment or exam..."
                        style={{ fontSize: '1.2rem', padding: '0.5rem' }}
                    />
                    <input
                        type="datetime-local"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        background: 'var(--accent-purple)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        width: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}
                >
                    <FaPlus />
                </button>
            </form>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {reminders.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                        No pending assignments. You're free! 🎉
                    </div>
                )}
                {reminders.map(rem => (
                    <div key={rem.id} style={{
                        background: 'var(--bg-secondary)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        opacity: rem.completed ? 0.5 : 1,
                        transition: 'all 0.2s ease'
                    }}>
                        <button onClick={() => toggleComplete(rem.id)} style={{ color: rem.completed ? 'var(--accent-cyan)' : 'var(--text-secondary)', fontSize: '1.2rem' }}>
                            {rem.completed ? <FaCheckCircle /> : <FaRegCircle />}
                        </button>
                        <div style={{ flex: 1, textDecoration: rem.completed ? 'line-through' : 'none' }}>
                            <div style={{ fontSize: '1.1rem' }}>{rem.text}</div>
                            {rem.date && <div style={{ fontSize: '0.8rem', color: 'var(--accent-rose)' }}>Due: {new Date(rem.date).toLocaleString()}</div>}
                        </div>
                        <button onClick={() => deleteReminder(rem.id)} style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reminder;
