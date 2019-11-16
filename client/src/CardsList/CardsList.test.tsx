import React from 'react';
import ReactDOM from 'react-dom';
import CardsList from './CardsList';
import Card from '../shared/interfaces/Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const cards:Card[] = [];
  ReactDOM.render(<CardsList cardsList={cards}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
