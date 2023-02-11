import React from "react";
import CardElement from "./CardElement";

function GameBoard(props) {
    return (
        <div id="gameboard">
            {props.cards.map((card) => {
                return (
                    <CardElement
                        onHandleFlip={props.onHandleFlip}
                        key={card.id}
                        card={card}
                    ></CardElement>
                );
            })}
        </div>
    );
}

export default GameBoard;
