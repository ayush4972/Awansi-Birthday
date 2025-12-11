import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Cake from './Cake';
import Candle from './Candle';
import Confetti from './Confetti';

const CakeStage = () => {
    const [candleLit, setCandleLit] = useState(true);
    const [canCut, setCanCut] = useState(false);
    const [showCTA, setShowCTA] = useState(false);
    const [slicesLeft, setSlicesLeft] = useState(5); // 5 slices defined in Cake.jsx
    const confettiRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
        );

        const timer = setTimeout(() => {
            setCandleLit(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleExtinguish = () => {
        setTimeout(() => {
            setCanCut(true);
            setShowCTA(true);
            gsap.fromTo(".cta-text",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5, delay: 0.5 }
            );
        }, 1000);
    };

    const handleCut = () => {
        if (confettiRef.current) {
            confettiRef.current.fire();
        }

        setSlicesLeft(prev => prev - 1);

        if (showCTA) {
            gsap.to(".cta-text", { opacity: 0, duration: 0.5, onComplete: () => setShowCTA(false) });
        }
    };

    useEffect(() => {
        if (slicesLeft <= 0) {
            const timer = setTimeout(() => {
                if (window.showPostCutSection) window.showPostCutSection();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [slicesLeft]);

    // If all slices are gone, show blank screen (or maybe just confetti fading out)
    if (slicesLeft <= 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white">
                <Confetti ref={confettiRef} />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
            <Confetti ref={confettiRef} />

            <div className="relative flex items-center justify-center w-full h-full">
                {/* Heading centered over the cake */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full text-center pointer-events-none">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 drop-shadow-lg leading-tight">
                        Happy Birthday<br />to my Whole heart
                    </h1>
                </div>

                {/* Candle only visible if slices are there, but physically it sits on the cake. 
                    If we cut the cake, the candle should probably go away or fall? 
                    For simplicity, let's keep it until the last slice or hide it if it looks weird floating.
                    Actually, usually the candle is on one slice or in the middle. 
                    Let's hide the candle when cutting starts or keep it. 
                    User said "after cutting/removing all the cake the page should be blank".
                */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+6rem)] z-10 scale-[2] transition-opacity duration-500 ${slicesLeft < 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <Candle isLit={candleLit} onExtinguish={handleExtinguish} />
                </div>

                <Cake canCut={canCut} onCut={handleCut} />
            </div>

            <div className="absolute bottom-12 left-0 w-full flex items-center justify-center pointer-events-none z-50">
                {/* CTA Removed as per user request */}
            </div>
        </div>
    );
};

export default CakeStage;
