import React from 'react';
import './AddCard.scss';
import globales from '../shared/globales';

interface CustomInputProps {
    onCardAdded: Function;
}
export default class AddCard extends React.Component<CustomInputProps>{
    state ={
        card:{
            name:"",
            number:"",
            limit:"",
        },
        serverError:'',
        errors:{
            name:{required:true},
            number:{required:true,length:false,isNumeric:false},
            limit:{required:true,isNumeric:false}
        }
    }


    // initializing error messages containers
    nameErros   = null;
    cardErros   = null;
    limitErrors = null;

    // handle form submit
    onAddCard(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault(); //stop form redirection
        let isValid = this.checkFormValidity();
        if(isValid){
            //submit card to the API
            fetch(globales.apiBaseUrl+'cards', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.state.card)
               }).then((res)=>{
                   if(res.status ===200){
                    res.json().then((card)=>{
                        this.setState({...this.state,card:{
                            name:"",
                            number:"",
                            limit:"",
                        }});
                        this.props.onCardAdded(card);
                    })
                   }else{
                    res.json().then((err)=>{
                        this.setState({...this.state,serverError:err.error});
                    })
                   }
                   
               }).catch((err)=>{
                   this.setState({...this.state,serverError:'Something went wrong, please try again later'})
               });
        }

    }

    // check  validity
    /* --- rules: 
        all fields are required
        card number should be validated at the BE using Luhn 10
        card number be 10 digits
        limit should >= 0

    --- */
    checkInputValidity(inputName:string){
        
        
        switch(inputName){
            case 'name': // check for name field validation
                let requiredName = true;
                if(this.state.card.name !== '' && this.state.card.name !== null){
                    requiredName = false;
                }
                this.setState({
                    ...this.state,
                    errors:{
                        ...this.state.errors,
                        name:{required:requiredName}
                    }
                })
            break;    
            case 'number': // check for card number field validation
                let requiredNumber = true;
                let length = true;
                let isNumeric = true;

                if(this.state.card.number !== '' && this.state.card.number !== null){
                    requiredNumber = false;
                }
                if(this.state.card.number.length === 16){
                    length = false;
                }
                if(!isNaN(this.state.card.number as any)){
                    isNumeric = false;
                }
                this.setState({
                    ...this.state,
                    errors:{
                        ...this.state.errors,
                        number:{isNumeric:isNumeric ,length:length, required:requiredNumber}
                    }
                })
            break; 
            case 'limit': // check for limit field validation
                let requiredLimit = true;
                let validNumber = true;

                if(this.state.card.limit !== '' && this.state.card.limit !== null){
                    requiredLimit = false;
                }
                
                if(!isNaN(this.state.card.limit as any) && parseInt(this.state.card.limit)>=0){
                    validNumber = false;
                }
                this.setState({
                    ...this.state,
                    errors:{
                        ...this.state.errors,
                        limit:{isNumeric:validNumber , required:requiredLimit}
                    }
                })
            break;     
        }
       
         
    } 

    // check overall form validtiy 
    checkFormValidity(){
        for(let key in this.state.errors){
            for(let validationError in this.state.errors[key]){
                if(this.state.errors[key][validationError] === true){
                    return false;
                }
            }
        }
        return true;
    }

    // handle 2 way binding of the form inputs
    inputChangeHandler(e: React.FormEvent<HTMLInputElement>){
        let value = e.currentTarget.value;
        let name = e.currentTarget.name;
    
        this.setState({
            ...this.state,
            card:{...this.state.card,[name]:value},
            serverError:''
        },()=>{
            this.checkInputValidity(name);
        });
        

    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onAddCard.bind(this)} noValidate>
                    <div className="inputGroup">
                        <label>Name { this.state.errors.name.required?"*":null}</label>
                        <input type="text" name="name" autoComplete="off" value={this.state.card.name} onChange={this.inputChangeHandler.bind(this)}/>
                    </div>
                    <div className="inputGroup">
                        <label>Card Number { this.state.errors.number.required?"*":null}</label>
                        <input type="text" name="number" autoComplete="off" value={this.state.card.number} onChange={this.inputChangeHandler.bind(this)}/>
                        <p className="error">{ this.state.errors.number.length?"Card Number should be 16 digits":null}</p>
                        <p className="error">{ this.state.errors.number.isNumeric?"Card Number should be digits only":null}</p>
                    </div>
                    <div className="inputGroup">
                        <label>Limit { this.state.errors.limit.required?"*":null}</label>
                        <input type="text" name="limit" autoComplete="off" value={this.state.card.limit} onChange={this.inputChangeHandler.bind(this)}/>
                        <p className="error">{ this.state.errors.limit.isNumeric?"Limit should be numeric value & not less than zero":null}</p>
                    </div>
                    <p className="error">{ this.state.serverError}</p>
                    <button>Add Card</button>
                </form>
            </div>
        );

    }

}