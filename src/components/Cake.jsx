import React, { useRef } from 'react';
import gsap from 'gsap';

const Cake = ({ canCut, onCut }) => {
    const handleSliceClick = (e, index) => {
        if (!canCut) return;

        const slice = e.target;

        gsap.to(slice, {
            y: -50,
            x: (index % 2 === 0 ? -20 : 20),
            opacity: 0,
            scale: 0.8,
            rotation: (Math.random() * 30 - 15),
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                slice.style.display = 'none';
            }
        });

        onCut();
    };

    return (
        <div className="relative w-[75vmin] h-[75vmin] cursor-pointer">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                <defs>
                    <linearGradient id="cakeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFB6C1" /> {/* LightPink */}
                        <stop offset="100%" stopColor="#FF69B4" /> {/* HotPink */}
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.3" />
                    </filter>
                </defs>

                <path
                    d="M100 170 L100 60 Q50 0 0 60 Q0 100 100 170 Z"
                    fill="url(#cakeGradient)"
                    stroke="#FFF"
                    strokeWidth="2"
                    onClick={(e) => handleSliceClick(e, 0)}
                    className={`transition-opacity ${canCut ? 'hover:opacity-90' : ''}`}
                    style={{ transformOrigin: '100px 100px' }}
                />

                <path
                    d="M100 100 L100 40 Q50 0 20 50 L100 100"
                    fill="#FFC0CB" stroke="#FFF" strokeWidth="1"
                    onClick={(e) => handleSliceClick(e, 1)}
                    className={canCut ? 'cursor-pointer hover:brightness-110' : ''}
                />
                <path
                    d="M100 100 L100 40 Q150 0 180 50 L100 100"
                    fill="#FFC0CB" stroke="#FFF" strokeWidth="1"
                    onClick={(e) => handleSliceClick(e, 2)}
                    className={canCut ? 'cursor-pointer hover:brightness-110' : ''}
                />
                <path
                    d="M100 100 L20 50 Q0 100 100 180 L100 100"
                    fill="#FFB6C1" stroke="#FFF" strokeWidth="1"
                    onClick={(e) => handleSliceClick(e, 3)}
                    className={canCut ? 'cursor-pointer hover:brightness-110' : ''}
                />
                <path
                    d="M100 100 L180 50 Q200 100 100 180 L100 100"
                    fill="#FFB6C1" stroke="#FFF" strokeWidth="1"
                    onClick={(e) => handleSliceClick(e, 4)}
                    className={canCut ? 'cursor-pointer hover:brightness-110' : ''}
                />

                <circle cx="50" cy="50" r="5" fill="#FFF" />
                <circle cx="150" cy="50" r="5" fill="#FFF" />
                <circle cx="20" cy="80" r="5" fill="#FFF" />
                <circle cx="180" cy="80" r="5" fill="#FFF" />
                <circle cx="60" cy="130" r="5" fill="#FFF" />
                <circle cx="140" cy="130" r="5" fill="#FFF" />
                <circle cx="100" cy="160" r="5" fill="#FFF" />

            </svg>
        </div>
    );
};

export default Cake;
