import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const CORRECT_DOB = '20041213';

const normalizeInput = (input) => {
    return input.replace(/[^0-9]/g, '');
};

const AuthModal = ({ onAuthenticated }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const normalized = normalizeInput(input);

        if (normalized === CORRECT_DOB) {
            gsap.to(containerRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: onAuthenticated
            });
        } else {
            setError(true);
            gsap.fromTo(containerRef.current,
                { x: -10 },
                {
                    x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'sine.inOut', onComplete: () => {
                        gsap.to(containerRef.current, { x: 0, duration: 0.1 });
                    }
                }
            );
            setInput('');
        }
    };

    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-white/80 backdrop-blur-sm">
            <div ref={containerRef} className="flex flex-col items-center justify-center p-8">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-12 drop-shadow-sm">Enter Birthday</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center w-full max-w-md">
                    <div className="relative w-full">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setError(false);
                            }}
                            placeholder="YYYY/MM/DD"
                            className={`w-full text-4xl md:text-5xl font-bold text-center bg-transparent border-b-4 outline-none placeholder-gray-300 py-4 tracking-widest transition-colors ${error ? 'border-red-400 text-red-500' : 'border-gray-800 text-gray-800 focus:border-pastel-pink'
                                }`}
                            aria-label="Date of Birth"
                            aria-invalid={error}
                        />
                    </div>
                    {error && <p className="text-red-500 text-2xl font-bold animate-bounce">Incorrect date.</p>}
                    <button
                        type="submit"
                        className="mt-6 px-12 py-4 bg-gray-800 text-white text-2xl font-bold rounded-full hover:bg-gray-700 hover:scale-105 transition-all active:scale-95 shadow-lg"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
