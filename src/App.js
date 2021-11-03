import './App.css';
import React, {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
    {"src": "/img/helmet-1.png", matched: false},
    {"src": "/img/potion-1.png", matched: false},
    {"src": "/img/ring-1.png", matched: false},
    {"src": "/img/scroll-1.png", matched: false},
    {"src": "/img/shield-1.png", matched: false},
    {"src": "/img/sword-1.png", matched: false}
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({...card, id: Math.random()}))
        // when comparing two given items:
        // returns a negative number: same order given
        // returns a positive number: reverse order
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                console.log('MATCHED')
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)
        setTurns(prevTurns => prevTurns + 1)
    }

    // Start a new game automatically
    // Since there are no dependencies, the hook is only used once
    // when the component is first loaded.
    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard
                        card={card}
                        key={card.id}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                        matched={card.matched}
                    />
                ))}
            </div>
            <div>
                <h2>Turns: {turns}</h2>
            </div>
        </div>
    );
}

export default App;
