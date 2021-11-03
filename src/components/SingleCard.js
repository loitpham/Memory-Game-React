import React from 'react';
import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled, matched}) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card">
            <div className={`${flipped ? 'flipped' : ''} ${matched? 'matched' :  ''}`}>
                <img src={card.src} alt="card front" className="front"/>
                <img src="/img/cover.png"
                     alt="card back"
                     className="back"
                     onClick={handleClick}/>
            </div>
        </div>
    );
};
