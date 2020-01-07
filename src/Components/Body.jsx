import React, { Component } from 'react';
import Card from './Card';

const cardsArray = function () {
    const cards = Array.from(Array(8).keys());
    const doubleCards = [...cards, ...cards];
    for (let i = 0; i < doubleCards.length; i++) {
        let index = Math.floor(doubleCards.length * Math.random());
        let temp = doubleCards[index];
        doubleCards[index] = doubleCards[i];
        doubleCards[i] = temp;
    }
    return doubleCards;
}



export default class Body extends Component {
    state = {
        cards: [],
        flippedCard: null
    }

    componentDidMount() {
        this.shuffleCards()
    }

    shuffleCards = () => {
        const cards = cardsArray();
        const cardsObj = cards.map((card, i) => {
            return {
                cardId: i,
                cardNumber: card,
                isMatched: false,
                isFlipped: false
            }
        })
        this.setState({
            cards: cardsObj
        })
    }

    showCardFace = (card) => {
        if(card.isMatched) return;
        const copyCards = [...this.state.cards];
        copyCards.forEach(elem => {
            if(elem.cardId === card.cardId) {
                elem.isFlipped = !elem.isFlipped;
            }
        })
        this.setState({
            cards: copyCards
        }, () => {
            this.checkIfMatch(card);
        })
    }

    checkIfMatch = (card) => {
        const { flippedCard } = this.state;
        if(flippedCard) {
            if(card.cardNumber === flippedCard.cardNumber && card.cardId !== flippedCard.cardId) {
                this.matchCards(card);
            } else {
                this.setState({
                    flippedCard: null
                }, () => {
                    this.closeUnmatchedCards();
                });
            }
        } else {
            this.setState({
                flippedCard: card
            })
        }
        

    }

    matchCards = (card) => {
        const copyCards = [...this.state.cards];
        copyCards.forEach(elem => {
            if(elem.cardNumber === card.cardNumber) {
                elem.isMatched = true;
                
            }
        })
        this.setState({
            cards: copyCards,
            flippedCard: null
        })
       
        
    }

    closeUnmatchedCards = () => {
        const copyCards = [...this.state.cards];
        copyCards.forEach(card => {
            if(!card.isMatched) {
                card.isFlipped = false;
            }
        })
        setTimeout(() => {
            this.setState({
                cards: copyCards
            })
        }, 1000)
        
    }
    

    renderCards = () => {
        return this.state.cards.map((card, key) => {
            // {
            //     cardId: i,
            //     cardNumber: card,
            //     isMatched: false,
            //     isFlipped: false
            // }
            return (
                <div className={`card `} key={key}>
                    <div className='card_container'>
                        <Card card={card} showCardFace={this.showCardFace} />
                    </div> 
                </div>
            )
        })
    }


    restartGame = () => {
        this.setState({
            cards: [],
            flippedCard: null
        }, () => {
            this.shuffleCards()
        })
    }
 
    render() {
        const { cards } = this.state;
        const isFinished = cards.every((card) => card.isMatched)
        return (
            <div className="wrapper">
                {this.renderCards()}
                {isFinished && <button onClick={this.restartGame}>
                    RESTART GAME
                </button>}
            </div>
        )
    }
}
