import React, { useEffect, useState } from "react";

import game from "./game/game";

// Components
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

export default function MemoryGame() {
    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(game.createCardsFromTechs());
    }, []);

    function restart() {
        game.clearCards();
        setCards(game.createCardsFromTechs());
        setGameOver(false);
    }

    function handleFlip(card) {
        game.flipCard(
            card.id,
            () => {
                // GameOver callback
                setGameOver(true);
            },
            () => {
                // NoMatch Callback
                setCards([...game.cards]);
            }
        );
        setCards([...game.cards]);
    }

    return (
        <div>
            <GameBoard onHandleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    );
}
