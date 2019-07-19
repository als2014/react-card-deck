import React from 'react';
import { render } from 'react-dom';
import { CardStack } from './lib';
import styled from 'styled-components';
import './index.css'

const App = () => {
  const targetStackL = React.createRef();
  const targetStackR = React.createRef();

  return(
  <div>
    <h1>Card Stack</h1>
    <Container>
      <CardContainer>
        <CardStack cards={CardData} />
      </CardContainer>
      <CardContainer>
        <CardStack cards={CardData2} />
      </CardContainer>
    </Container>
    <h1>Target Stack</h1>
    <Container>
      <CardContainer>
        <CardStack 
        ref={targetStackL}
        targetStack={targetStackR}
        fadeOutDirection='right'
        />
      </CardContainer>
      <CardContainer>
        <CardStack 
         cards={CardData2} 
         maxVisibleCards={4}
         randomOffsetX={0}
         randomOffsetY={0}
         stackingDistanceY={'0px'}
         stackingDistanceX={'5em'}
         shrinkDistanceY={0.2}
         shrinkDistanceX={0.2}
         minScaleY={0.2}
         minScaleX={0.2}
         randomRotationMaxDeg={0}
         fadeOutDirection='left'
         targetStack={targetStackL}
         ref={targetStackR}
         />
      </CardContainer>
    </Container>
      <h1>Right to left</h1>
    <Container>
      <CardContainer>
        <CardStack 
         cards={CardData2} 
         maxVisibleCards={4}
         randomOffsetX={0}
         randomOffsetY={0}
         stackingDistanceY={'0'}
         stackingDistanceX={'5em'}
         shrinkDistanceY={0.2}
         shrinkDistanceX={0.2}
         minScaleY={0.2}
         minScaleX={0.2}
         randomRotationMaxDeg={0}
         fadeOutDirection='left'
         />
      </CardContainer>
    </Container>
  </div>
  )
  };

const Container = styled.div`
  display: flex;
  height: 20em;
  background-color: #f1f1f1;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  overflow: hidden;
`

const CardContainer = styled.div`
  height: 13em;
  width:  12em;
`

const TitleCard = ({ nextCard }) => (
  <CardContent backgroundColor="#1db954" onClick={() => nextCard()}>
    <Headline>react-cardstack</Headline>
    <Text>Cardstacks made easy</Text>
  </CardContent>
);

const Card2 = ({ nextCard }) => (
  <CardContent onClick={() => nextCard()}>
    <div>Hello React</div>
  </CardContent>
);

const IndexCard = ({ cardIndex, totalCards, nextCard }) => (
  <CardContent onClick={() => nextCard()}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Headline>Almost made it</Headline>
    </div>
    <Text style={{ marginBottom: '3em' }}>You're on page</Text>
    <Text style={{ opacity: 0.8 }}>{(cardIndex + 1) + '/' + totalCards}</Text>
  </CardContent>
);

const LastCard = ({ nextCard }) => (
  <CardContent backgroundColor='#1c1c1c'>
    <Headline color='#fff'>Like what you've seen?</Headline>
    <Text style={{ fontFamily: 'Courier New' }} color='#fff'>> npm i react-cardstack</Text>
  </CardContent>
);

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const CountCard = ({ nextCard, nextCardToTarget, i, backgroundColor }) => (
  <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3em' }} backgroundColor={backgroundColor} onClick={() => nextCardToTarget()}>
    <div>{10 - i}</div>
  </CardContent>
)

const CountCards = ([...Array(10).keys()].map((c, i) => {
  console.log(i)
  return <CountCard i={i} backgroundColor={getRandomColor()} />
}))

const CardData = [
  <TitleCard />,
  <Card2 />,
  <IndexCard />,
  <LastCard />,
]

const CardData2 = [
  ...CountCards
]

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 1em;
  background-color: ${p => p.backgroundColor || '#fff'};
`

const Text = styled.div`
  font-size: 1em;
  color: ${p => p.color || '#000'};
`

const Headline = styled(Text)`
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 0.4em;
`


render(<App />, document.getElementById("root"));
