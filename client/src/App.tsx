import React,{useState, useEffect} from 'react';
import './App.scss';
import AddCard from './AddCard/AddCard';
import CardsList from './CardsList/CardsList';
import Card from './shared/interfaces/Card';
import globales from './shared/globales';

const App: React.FC = () => {
  const cards:Card[]=[];
  const [cardState, setCardState] = useState({cards:cards});
  useEffect(()=>{
    fetch(globales.apiBaseUrl+'cards').then((res)=>{
      res.json().then(cards=>{
          
          setCardState({cards:cards});
          
      })
    })

  },[cardState])
  const cardAdded = (card:Card)=>{
    cardState.cards.push(card);
    setCardState({cards:cards});

  }
  return (
    <div className="App">
      <div className="container">
        <h1> Credit Card System</h1>
      </div>
      <AddCard onCardAdded={cardAdded}/>
      <CardsList cardsList={cardState.cards}/>
    </div>
  );
}

export default App;
