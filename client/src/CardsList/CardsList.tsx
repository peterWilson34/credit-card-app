import React from 'react';
import Card from '../shared/interfaces/Card';

import './CardsList.scss';
interface CustomInputProps {
    cardsList: Card[];
}
export default class CardsList extends React.Component<CustomInputProps>{
   
    
    
    
    render(){
        return(
            <div className="container cardsList">
            {this.props.cardsList.length?
               <div> 
                    <h2>
                        Existing Cards
                    </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Card Number</th>
                                <th>Balance</th>
                                <th>Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.cardsList.map((card:Card, index) => {
                            return (
                                <tr key={index}>
                                <td>{card.name}</td>
                                <td>{card.number}</td>
                                <td>£{card.balance}</td>
                                <td>{card.limit}</td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>:
                <p className="emptyState">There is no cards currently, you can add your first card but submitting the above form.</p>
            }
            </div>
        );
    }    
}