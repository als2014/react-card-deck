function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { fadeOutDown, fadeOutLeft, fadeOutUp, fadeOutRight } from 'react-animations';
import _ from 'lodash';

class CardStack extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "nextCard", currentCardIndex => {
      let fadingOutCard = this.state.cards[currentCardIndex];
      fadingOutCard.fadingOut = true;
      let newCards = [...this.state.cards];
      newCards[currentCardIndex] = fadingOutCard;
      this.setState({
        cards: newCards
      }, () => _.delay(() => {
        this.setState({
          cards: this.state.cards.filter(c => c !== fadingOutCard)
        });
      }, this.props.fadeOutDuration * 1000));
    });

    this.state = {
      cards: props.cards.map((c, i) => {
        return {
          component: c,
          index: i,
          offsetX: Math.round(Math.random() * props.randomOffsetX * 2) - props.randomOffsetX,
          offsetY: Math.round(Math.random() * props.randomOffsetY * 2) - props.randomOffsetY,
          rotation: i === 0 && !props.firstCardRotation ? 0 : Math.round(Math.random() * props.randomRotationMaxDeg * 2) - props.randomRotationMaxDeg,
          fadingOut: false
        };
      })
    };
  }

  render() {
    return React.createElement(CardsContainer, null, this.state.cards.map((card, i) => {
      if (this.props.maxVisibleCards && (this.props.waitForFadeOut ? i : i - this.state.cards.filter(c => c.fadingOut).length) >= this.props.maxVisibleCards) return undefined;
      const CardComponent = React.cloneElement(card.component, {
        cardIndex: card.index,
        cardsInDeck: this.state.cards.length,
        totalCards: this.props.cards.length,
        nextCard: () => this.state.cards.filter(c => c.fadingOut).length - i === 0 && this.nextCard(i)
      });
      return React.createElement(Card, {
        key: card.index,
        cardIndex: this.props.waitForFadeOut ? i : i - this.state.cards.filter(c => c.fadingOut).length,
        cardsInDeck: this.state.cards.length,
        stackingDistanceY: this.props.stackingDistanceY,
        stackingDistanceX: this.props.stackingDistanceX,
        shrinkDistanceY: this.props.shrinkDistanceY,
        shrinkDistanceX: this.props.shrinkDistanceX,
        minScaleY: this.props.minScaleY,
        minScaleX: this.props.minScaleX,
        offsetX: card.offsetX,
        offsetY: card.offsetY,
        rotation: card.rotation,
        fadeOutDirection: this.props.fadeOutDirection,
        fadeOutDuration: this.props.fadeOutDuration,
        fadingOut: card.fadingOut
      }, CardComponent);
    }));
  }

}

_defineProperty(CardStack, "defaultProps", {
  cards: [],
  defaultCard: 0,
  maxVisibleCards: undefined,
  stackingDistanceY: '3px',
  stackingDistanceX: '0px',
  shrinkDistanceY: 0,
  shrinkDistanceX: 0,
  minScaleY: 0,
  minScaleX: 0,
  randomOffsetX: 5,
  randomOffsetY: 0,
  randomRotationMaxDeg: 1,
  firstCardRotation: false,
  fadeOutDirection: 'down',
  fadeOutDuration: 1,
  waitForFadeOut: false
});

;
const CardsContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const Card = styled.div`
  position: absolute;
  transform: rotate(${p => p.rotation}deg) scale(${p => 1 - p.cardIndex * p.shrinkDistanceX > p.minScaleX ? 1 - p.cardIndex * p.shrinkDistanceX : p.minScaleX}, ${p => 1 - p.cardIndex * p.shrinkDistanceY > p.minScaleY ? 1 - p.cardIndex * p.shrinkDistanceY : p.minScaleY});
  top: calc((${p => p.offsetY}px + (${p => p.cardIndex} *  ${p => p.stackingDistanceY})));
  bottom: calc((${p => p.offsetY}px + (${p => p.cardIndex} *  ${p => p.stackingDistanceY})) * -1 );
  left: calc((${p => p.offsetX}px + (${p => p.cardIndex} *  ${p => p.stackingDistanceX})));
  right: calc((${p => p.offsetX}px + (${p => p.cardIndex} *  ${p => p.stackingDistanceX})) * -1 );
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: ${p => p.cardIndex * -1 + p.cardsInDeck};

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  ${p => p.fadingOut && css`{
      animation: ${p => p.fadeOutDuration}s ${p => fadeOutDirectionMapper(p.fadeOutDirection)};
      user-select: none;
      transition: 0.3s, box-shadow 0s;
      box-shadow: none;
  }`};

  > div {
    box-sizing: border-box;
  }
`;
const fadeOutDownAnimation = keyframes`${fadeOutDown}`;
const fadeOutUpAnimation = keyframes`${fadeOutUp}`;
const fadeOutRightAnimation = keyframes`${fadeOutRight}`;
const fadeOutLeftAnimation = keyframes`${fadeOutLeft}`;

const fadeOutDirectionMapper = direction => {
  switch (direction) {
    case 'up':
      return fadeOutUpAnimation;

    case 'down':
      return fadeOutDownAnimation;

    case 'right':
      return fadeOutRightAnimation;

    case 'left':
      return fadeOutLeftAnimation;

    default:
      throw 'Invalid fadeOutDirection: valid values are up, left, down, right';
  }
};

export default CardStack;