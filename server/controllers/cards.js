const Response = require('../models/Response');
const Card = require('../models/Card')
const validate = require('cc-validate');
let Cards = [] // to be replaced with the databse 

module.exports = {
  add:function (req,res) {
    let card = req.body;
    let response={code:200}
    let validatedCard;
    if(card.name==""||card.name==null){
        response = {code:400,msg:{error:"Name is required"}}
    }
    if(card.number){
        if(!validate.isValid(card.number).isValid){
            response = {code:400,msg:{error:"Card number is not valid"}}
        }else{
            validatedCard = validate.isValid(card.number);
        }
    }else{
        response = {code:400,msg:{error:"Card number is required"}}

    }
    if(card.limit){
        if(card.limit<0 || isNaN(card.limit)){
            response = {code:400,msg:{error:"Card limit should be number and not less than zero"}}
        }
    }else{
        response = {code:400,msg:{error:"Card limit is required"}}

    }
    
    if(response.code === 200){
        response.msg = card
        card.number = validatedCard.cardNumber;
        card = new Card(card)
        Cards.push(card)
    }
    res.status(response.code).json(response.msg)
  },

  getAll:function (req,res) {
    res.json(200,Cards)
  }
}
