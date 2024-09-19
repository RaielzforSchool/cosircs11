const readline = require('readline');

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

class LinearExpression {
  constructor() {
    this.leftvar = undefined;
    this.leftcoefficient = undefined;
    this.leftnum = undefined;
    this.rightvar = undefined;
    this.rightcoefficient = undefined;
    this.rightnum = undefined;
    this.leftop = undefined;
    this.rightop = undefined;
    this.equation = undefined;
  }

  updateEquation() {
    this.equation = `${this.leftcoefficient}${this.leftvar} ${this.leftop} ${this.leftnum} = ${this.rightcoefficient}${this.rightvar} ${this.rightop} ${this.rightnum}`;
  }

  createRandomEquation() {
    while (true) {
      let possNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let possOps = ['+', '-'];
      let leftcoefficient = getRandomElement(possNums);
      let rightcoefficient = getRandomElement(possNums);
      let rightnum = getRandomElement(possNums);
      let leftnum = getRandomElement(possNums);
      let leftop = getRandomElement(possOps);
      let rightop = getRandomElement(possOps);
      let rightvar = 'x';
      let leftvar = 'x';
      if (leftcoefficient !== 1 && rightcoefficient !== 1) {
        this.leftvar = leftvar;
        this.leftcoefficient = leftcoefficient;
        this.leftnum = leftnum;
        this.rightvar = rightvar;
        this.rightcoefficient = rightcoefficient;
        this.rightnum = rightnum;
        this.leftop = leftop;
        this.rightop = rightop;
        this.updateEquation();
        return this.equation;
      }
    }
  }

  returnDegree(value) {
    if (value === this.leftvar || value === this.rightvar) {
      return 1;
    } else if (value === this.leftnum || value === this.rightnum) {
      return 0;
    } else {
      return "Could not identify degree";
    }
  }

  addValBothSides(value) {
    if (this.returnDegree(this.leftvar) === 1) {
      this.leftnum += value;
      this.rightnum += value;
    } else if (this.returnDegree(this.leftnum) === 0) {
      this.leftnum += value;
      this.rightnum += value;
    } else {
      console.log('Error occurred.');
    }
    this.updateEquation();
  }

  subValBothSides(value) {
    if (this.returnDegree(this.leftvar) === 1) {
      this.leftnum -= value;
      this.rightnum -= value;
    } else if (this.returnDegree(this.leftnum) === 0) {
      this.leftnum -= value;
      this.rightnum -= value;
    } else {
      console.log('Error occurred.');
    }
    this.updateEquation();
  }

  mulValBothSides(value) {
    if (typeof value === 'number') {
      this.leftcoefficient *= value;
      this.rightcoefficient *= value;
    } else {
      console.log('Needs to be a number.');
    }
    this.updateEquation();
  }

  divValBothSides(value) {
    if (typeof value === 'number') {
      this.leftcoefficient /= value;
      this.rightcoefficient /= value;
    } else {
      console.log('Needs to be a number.');
    }
    this.updateEquation();
  }

  returnVarsAsArr() {
    let listvar = [
      this.leftcoefficient,
      this.leftnum,
      this.rightcoefficient,
      this.rightnum
    ];
    return listvar;
  }
}

function performOperation(expression, op, opnum) {
  opnum = Number(opnum);
  switch (op) {
    case '+':
      expression.addValBothSides(opnum);
      break;
    case '-':
      expression.subValBothSides(opnum);
      break;
    case 'x':
      expression.mulValBothSides(opnum);
      break;
    case '/':
      expression.divValBothSides(opnum);
      break;
    default:
      console.log('Invalid operation');
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  let keepRunning = true;

  let count=0;
  while (keepRunning) {
    let expression = new LinearExpression();
    let equation = expression.createRandomEquation();
    if(count===0){
      console.log(expression.equation);
    }
    

    const operation = await askQuestion('What would you like to do: +, -, x, /\n');
    const operationNum = await askQuestion(`By what number: ${expression.returnVarsAsArr()}\n`);

    performOperation(expression, operation, operationNum);
    console.log('Initial Equation:', equation);
    console.log('Updated Equation:', expression.equation);

    const continueInput = await askQuestion('Do you want to continue? (yes/no)\n');
    keepRunning = continueInput.toLowerCase() === 'yes';
  }

  rl.close();
}

main();
