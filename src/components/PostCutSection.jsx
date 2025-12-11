import React, { useState } from 'react';
import './PostCutSection.css';

const PostCutSection = () => {
    // State to track flipped cards
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const memories = [
        {
            id: 1,
            image: '/images/image2.jpg',
            text: "I don't just miss you… I crave your voice, your smile, your energy."
        },
        {
            id: 2,
            image: '/images/image3.HEIC',
            text: "Long-distance should feel lonely, but somehow you make it feel like I'm still holding your hand."
        },
        {
            id: 3,
            image: '/images/image4.HEIC',
            text: "If you were here right now…\nI wouldn't even be talking."
        },
        {
            id: 4,
            image: '/images/image5.HEIC',
            text: "I was doing nothing special, and suddenly my brain went:\n\"Hey… I wish she was here.\""
        },
        {
            id: 5,
            image: '/images/image6.HEIC',
            text: "Sometimes I get hit by this warm feeling out of nowhere, and it reminds me of you."
        },
        {
            id: 6,
            image: '/images/image7.jpg',
            text: "One day, distance won't matter.\nIt'll be me, you, weekend breakfasts together, lazy cuddles, and the happiest version of us."
        },
        {
            id: 7,
            image: '/images/image8.JPEG',
            text: "No matter where I am, what time it is, or how tired I feel — you're my comfort thought. My safe person. My favorite human."
        },
        {
            id: 8,
            image: '/images/image9.JPEG',
            text: "Sometimes I stop and think about how insanely lucky I am to call you mine."
        },
        {
            id: 9,
            image: '/images/image10.HEIC',
            text: "I don't know when I'll see you next…\nbut I'm already counting the days, hours, minutes — anything that brings me closer to you."
        }
    ];



    return (
        <div className="post-cut-container">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">Happy Birthday to my whole heart</h1>
                <div className="message-box">
                    <h2 className="message-title">happy birthday Kismis Dumb Queen!!!</h2>
                    <p className="message-text">
                        I love listening to you. I love seeing your face.
                        I love all the kinds of facial expressions you make. I love hearing your voice. I love the drowning feeling I get when I look into your eyes sometimes. I love how you smell. I really love a lot of things about you. I kinda love/hate your brutal honesty, though. There are things I don't like about you but these things don't really matter. Things I don't even notice hence I tend to forget.
                        <br /><br />
                        I'm not saying you're perfect. Nobody is.
                        <br />
                        Perhaps everyone has their own idea of perfection and mine happens to be YOU.
                    </p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="gallery-container">
                    <div className="gallery-grid">
                        {memories.map((memory, index) => (
                            <div
                                key={memory.id}
                                className={`flip-card ${flippedCards[index] ? 'flipped' : ''}`}
                                onClick={() => toggleFlip(index)}
                            >
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={memory.image} alt={`Memory ${memory.id}`} />
                                    </div>
                                    <div className="flip-card-back">
                                        <p style={{ whiteSpace: 'pre-line' }}>{memory.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostCutSection;
