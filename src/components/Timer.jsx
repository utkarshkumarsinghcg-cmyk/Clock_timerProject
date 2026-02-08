import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaCoffee, FaBrain } from 'react-icons/fa';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25m
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, short-break, long-break
    const timerRef = useRef(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timerRef.current);
            setIsActive(false);
            alert("Time's up! Take a break or get back to work! 🔔");
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'focus') setTimeLeft(25 * 60);
        if (mode === 'short-break') setTimeLeft(5 * 60);
        if (mode === 'long-break') setTimeLeft(15 * 60);
    };

    const setPreset = (type) => {
        setIsActive(false);
        setMode(type);
        if (type === 'focus') setTimeLeft(25 * 60);
        if (type === 'short-break') setTimeLeft(5 * 60);
        if (type === 'long-break') setTimeLeft(15 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setPreset('focus')}
                    style={{
                        padding: '0.5rem 1rem',
                        background: mode === 'focus' ? 'var(--accent-purple)' : 'var(--bg-tertiary)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <FaBrain /> Focus (25m)
                </button>
                <button
                    onClick={() => setPreset('short-break')}
                    style={{
                        padding: '0.5rem 1rem',
                        background: mode === 'short-break' ? 'var(--accent-cyan)' : 'var(--bg-tertiary)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <FaCoffee /> Short Break (5m)
                </button>
            </div>

            <div style={{
                fontSize: '6rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                marginBottom: '2rem',
                color: mode === 'focus' ? 'var(--text-primary)' : 'var(--accent-cyan)'
            }}>
                {formatTime(timeLeft)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button
                    onClick={toggleTimer}
                    style={{
                        fontSize: '1.5rem',
                        padding: '1rem 2rem',
                        background: isActive ? 'var(--bg-tertiary)' : 'var(--accent-purple)',
                        borderRadius: '2rem',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {isActive ? <><FaPause /> Pause</> : <><FaPlay /> Start</>}
                </button>
                <button
                    onClick={resetTimer}
                    style={{
                        fontSize: '1.5rem',
                        padding: '1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '50%',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

export default Timer;
