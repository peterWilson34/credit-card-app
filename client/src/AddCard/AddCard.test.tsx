import React from 'react';
import ReactDOM from 'react-dom';
import AddCard from './AddCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const cardAdded = ()=>{}
  ReactDOM.render(<AddCard onCardAdded={cardAdded}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
