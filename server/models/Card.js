module.exports = class Card{
    constructor({name,number,limit,balance}){
        this.name = name;
        this.number = number;
        this.limit  = limit;
        this.balance = balance||0;
    }
}