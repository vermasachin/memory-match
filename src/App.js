import React from 'react';

// TODO
/*
  - Add github link
  - Improve design
  - Use images instead of numbrs
  - Use hooks
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      openCards: [],
      clearedCards: [],
      clicks: 0
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
    this.setState({ cards, clicks: 0 });
  };

  // TODO

  handleCardClick = card => {
    const { openCards } = this.state;
    if (
      openCards.some(cardOpen => cardOpen.id !== card.id) ||
      openCards.length < 1
    ) {
      this.setState(
        prevState => ({
          openCards: [...openCards, card],
          clicks: prevState.clicks + 1
        }),
        () => this.matchCards(card)
      );
    }
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
                openCards: []
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
    if (this.state.cards.every(card => card.matched))
      return (
        <div className="App">
          <p>It took you {this.state.clicks} clicks to solve the grid.</p>
          <button onClick={this.restart}>Restart</button>
        </div>
      );
    return (
      <>
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
        <a
          className="github"
          href="https://github.com/vermasachin/memory-match"
        >
          Github
        </a>
      </>
    );
  }
}

function Card(props) {
  const checkMatched =
    (props.openCards[0] && props.openCards[0].id === props.card.id) ||
    (props.openCards[1] && props.openCards[1].id === props.card.id) ||
    props.card.matched;

  return (
    <>
      <div className="flip-container">
        <div
          className={`flipper ${checkMatched && 'selected'}`}
          onClick={() => props.handleCardClick(props.card)}
        >
          <div className="front" />

          <div className="back" style={{ color: 'black' }}>
            {props.card.value}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
