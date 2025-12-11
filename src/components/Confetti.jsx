import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import gsap from 'gsap';

const Confetti = forwardRef((props, ref) => {
    const [particles, setParticles] = useState([]);

    const fire = useCallback(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: Date.now() + i,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            color: ['#FFD1DC', '#FFFDD0', '#FDFD96', '#AEC6CF', '#77DD77'][Math.floor(Math.random() * 5)]
        }));

        setParticles(prev => [...prev, ...newParticles]);

        setTimeout(() => {
            newParticles.forEach(p => {
                const el = document.getElementById(`confetti-${p.id}`);
                if (!el) return;

                gsap.fromTo(el,
                    { x: 0, y: 0, scale: 0 },
                    {
                        x: (Math.random() - 0.5) * 500,
                        y: (Math.random() - 0.5) * 500,
                        rotation: Math.random() * 360,
                        scale: Math.random() * 1.5,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        onComplete: () => {
                            setParticles(prev => prev.filter(item => item.id !== p.id));
                        }
                    }
                );
            });
        }, 10);
    }, []);

    useImperativeHandle(ref, () => ({
        fire
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    id={`confetti-${p.id}`}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{
                        backgroundColor: p.color,
                        left: '50%',
                        top: '50%'
                    }}
                />
            ))}
        </div>
    );
});

export default Confetti;
