import React from 'react';

export default function Card(props) {
    // { this.props.card -->
    //     cardId: i,
    //     cardNumber: card,
    //     isMatch: false,
    //     isFlipped: false
    // }
    const addClass = (card) => {
        if (props.card.isFlipped) {
            if (props.card.isMatched) {
                return `card_face_up card_ismatched pic_${card.cardNumber + 1}`;
            }
            return `card_face_up pic_${card.cardNumber + 1}`;
        } else {
            return 'card_face_down';
        }
    }
    return (
        <div
            className={addClass(props.card)}
            onClick={() => props.showCardFace(props.card)}
        > </div>
    )

}
