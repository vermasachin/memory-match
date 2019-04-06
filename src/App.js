import React, { useState } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      openCards: [],
      clearedCards: [],
      score: 0
    };
  }

  componentDidMount = () => {
    this.resetCards();
  };

  resetCards = () => {
    const array = Array.from(Array(12), (item, index) =>
      index % 2
        ? { id: index + 1, value: index, matched: false }
        : { id: index + 1, value: index + 1, matched: false }
    );

    const cards = array.sort((a, b) => 0.5 - Math.random());
    this.setState({ cards, score: 0 });
  };

  handleCardClick = card => {
    const { openCards } = this.state;

    this.setState({ openCards: [...openCards, card] }, () =>
      this.matchCards(card)
    );
  };

  matchCards = () => {
    const { openCards, cards } = this.state;

    if (openCards.length > 2) {
      this.setState({ openCards: [] });
    } else if (openCards.length === 2) {
      openCards[0].value === openCards[1].value
        ? setTimeout(
            () =>
              this.setState({
                cards: cards.map(card =>
                  card.value === openCards[0].value
                    ? { ...card, matched: true }
                    : card
                ),
                openCards: [],
                score: this.state.score + 1
              }),
            500
          )
        : setTimeout(() => this.setState({ openCards: [] }), 500);
    }
  };

  restart = () => {
    this.resetCards();
  };

  render() {
    if (this.state.score === 6)
      return (
        <>
          <button onClick={this.restart}>Restart</button>
        </>
      );
    return (
      <div className="App">
        <h1>Flip Card</h1>
        {this.state.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleCardClick={this.handleCardClick}
            openCards={this.state.openCards}
            arr={this.state.clearedCards}
          />
        ))}
      </div>
    );
  }
}

function Card(props) {
  return (
    <>
      <div className="flip-container">
        <div
          className={`flipper ${((props.openCards[0] &&
            props.openCards[0].id === props.card.id) ||
            (props.openCards[1] && props.openCards[1].id === props.card.id) ||
            props.card.matched) &&
            'selected'}`}
          onClick={() => props.handleCardClick(props.card)}
        >
          <div className="front" />

          <div className="back">
            <img
              alt="match"
              src={`https://picsum.photos/184/200?image=${1}${
                props.card.value
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
