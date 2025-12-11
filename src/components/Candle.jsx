import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Candle = ({ isLit, onExtinguish }) => {
    const flameRef = useRef(null);
    const smokeRef = useRef(null);

    useEffect(() => {
        if (isLit) {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.to(flameRef.current, {
                scaleY: 1.1,
                scaleX: 0.9,
                duration: 0.1,
                ease: "power1.inOut"
            }).to(flameRef.current, {
                scaleY: 0.9,
                scaleX: 1.1,
                duration: 0.1,
                ease: "power1.inOut"
            }).to(flameRef.current, {
                rotation: 3,
                duration: 0.1,
                ease: "sine.inOut"
            }).to(flameRef.current, {
                rotation: -3,
                duration: 0.1,
                ease: "sine.inOut"
            });
        } else {
            gsap.to(flameRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });

            if (smokeRef.current) {
                gsap.fromTo(smokeRef.current,
                    { opacity: 0, scale: 0.5, y: 0 },
                    {
                        opacity: 0.8, scale: 1.5, y: -50, duration: 2, ease: "power1.out", onComplete: () => {
                            gsap.to(smokeRef.current, { opacity: 0, duration: 1 });
                        }
                    }
                );
            }

            if (onExtinguish) onExtinguish();
        }
    }, [isLit, onExtinguish]);

    return (
        <div className="relative flex flex-col items-center">
            <div className="absolute -top-16 z-20">
                <svg width="40" height="60" viewBox="0 0 40 60" className="overflow-visible">
                    <defs>
                        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                        </filter>
                        <linearGradient id="flameGradient" x1="0.5" y1="1" x2="0.5" y2="0">
                            <stop offset="0%" stopColor="#FF5722" />
                            <stop offset="50%" stopColor="#FFC107" />
                            <stop offset="100%" stopColor="#FFF" />
                        </linearGradient>
                    </defs>
                    <path
                        ref={flameRef}
                        d="M20 0 Q30 20 30 40 Q30 60 20 60 Q10 60 10 40 Q10 20 20 0"
                        fill="url(#flameGradient)"
                        filter="url(#blur)"
                        className="origin-bottom"
                    />
                    <g ref={smokeRef} opacity="0">
                        <circle cx="20" cy="10" r="5" fill="#ccc" filter="url(#blur)" />
                        <circle cx="25" cy="5" r="4" fill="#bbb" filter="url(#blur)" />
                        <circle cx="15" cy="15" r="6" fill="#ddd" filter="url(#blur)" />
                    </g>
                </svg>
            </div>

            <div className="w-8 h-32 bg-gradient-to-b from-white to-gray-100 rounded-md shadow-md border border-gray-200 z-10 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-black -mt-2"></div>
                <div className="w-full h-4 bg-pastel-pink opacity-50 mt-4"></div>
                <div className="w-full h-4 bg-pastel-pink opacity-50 mt-8"></div>
                <div className="w-full h-4 bg-pastel-pink opacity-50 mt-8"></div>
            </div>
        </div>
    );
};

export default Candle;
