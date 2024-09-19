class LinearEquation {
  constructor(){
    this.coef = undefined;
    this.var= undefined;
    this.num= undefined;
    this.op= undefined;
    this.num2= undefined;
    this.equation= undefined;
    this.previousEquation= undefined;

  }

  updateEquation (){
    //checks if coef is 0 or 1 to make sure not to include either cof or var
    if (this.coef === 0){
      this.equation = `${this.num} = ${this.num2}`;
    } else if( this.coef===1) {
      this.equation = `${this.var} ${this.op} ${this.num}= ${this.num2}`;
    } else {this.equation = `${this.coef}${this.var} ${this.op} ${this.num}= ${this.num2}`;}
    
  }
  returnEquation(){
    //returns equation var
    return this.equation
  }

  answerIsInt(){
    if (this.op === '+'){
      if((this.num2 - this.num)/this.coef){
        return true
      } else if (this.op === '-'){
        if ((this.num2 + this.num) / this.coef) {
          return true
        } else {return false}
      }

    }
  }
  createRandEquation(){
    randInt = math.floor(Math.random(1,10.99))
    while (true){
      if (Math.random(0,1) > .5) {op='+'} else {op='-'}
      coef = randInt;
      num = randInt;
      num2 = randInt;
      if (this.answerIsInt){
        this.equation = `${coef}${this.var} ${op} ${num} = ${num2}`
        this.coef = coef;
        this.num = num;
        this.num2 = num2;
        this.op = op;
        return `${coef}${this.var} ${op} ${num} = ${num2}`
      }
    }
    
    
  }

  returnPossNumList(){
    return [this.coef, this.num, this.num2];
  }
  returnPossOpList(){
    list = []
    if (this.op === '+'){list.push('-')}
    if (this.op === '-'){list.push('+')}
    if (this.coef !== 0 && this.coef !== 1) {list.push('/')}
    return list;
  }
    
  performAddition(amount){
    this.previousEquation = this.equation;
    this.num, this.num2 += amount, amount;
    console.log(`Added: ${amount} to both sides.`);
    this.updateEquation();
    console.log(`Updated Equation.`);
  }
  performSubtraction(amount){
    this.previousEquation = this.equation;
    this.num, this.num2 -= amount, amount;
    console.log(`Subbed: ${amount} from both sides.`);
    this.updateEquation();
    console.log(`Updated Equation.`);
  }
  perfromDivision(amount){
    this.previousEquation = this.equation;
    this.num, this.num2 /= amount, amount;
    console.log(`Divided: ${amount} on both sides.`);
    this.updateEquation();
    console.log(`Updated Equation.`);
  }
}