import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStop, FaFlag } from 'react-icons/fa';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };

    const addLap = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '500px' }}>
            <div style={{
                fontSize: '5rem',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                marginBottom: '2rem',
                color: 'var(--text-primary)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
            }}>
                {formatTime(time)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={toggleTimer}
                    style={{
                        fontSize: '1.2rem',
                        padding: '1rem 2rem',
                        background: isActive ? 'var(--bg-tertiary)' : 'var(--accent-cyan)',
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
                    onClick={addLap}
                    disabled={!isActive}
                    style={{
                        fontSize: '1.2rem',
                        padding: '1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '50%',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        opacity: isActive ? 1 : 0.5
                    }}
                >
                    <FaFlag />
                </button>
                <button
                    onClick={resetTimer}
                    style={{
                        fontSize: '1.2rem',
                        padding: '1rem',
                        background: 'var(--accent-rose)',
                        borderRadius: '50%',
                        color: 'white'
                    }}
                >
                    <FaStop />
                </button>
            </div>

            {laps.length > 0 && (
                <div style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem'
                }}>
                    {laps.map((lap, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.5rem',
                            borderBottom: '1px solid var(--bg-tertiary)',
                            color: 'var(--text-secondary)'
                        }}>
                            <span>Lap {index + 1}</span>
                            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatTime(lap)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
