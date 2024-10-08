class LinearEquation {
  constructor() {
    this.coef = undefined;
    this.var = 'x';
    this.num = undefined;
    this.op = undefined;
    this.num2 = undefined;
    this.equation = undefined;
    this.previousEquation = undefined;
  }

  updateEquation() {
    // checks if coef is 0 or 1 to ensure we don't include them in the equation
    if (this.coef === 0) {
      this.equation = `${this.num} = ${this.num2}`;
    } else if (this.coef === 1) {
      this.equation = `${this.var} ${this.op} ${this.num} = ${this.num2}`;
    } else {
      this.equation = `${this.coef}${this.var} ${this.op} ${this.num} = ${this.num2}`;
    }
  }

  returnEquation() {
    // returns equation var
    return this.equation;
  }

  answerIsInt() {
    if (this.op === '+') {
      return (this.num2 - this.num) / this.coef === Math.floor((this.num2 - this.num) / this.coef);
    } else if (this.op === '-') {
      return (this.num2 + this.num) / this.coef === Math.floor((this.num2 + this.num) / this.coef);
    }
    return false;
  }

  createRandEquation() {
    while (true) {
      this.coef = Math.floor(Math.random() * 10) + 1;
      this.num = Math.floor(Math.random() * 10) + 1;
      this.num2 = Math.floor(Math.random() * 10) + 1;
      this.op = Math.random() > 0.5 ? '+' : '-';
      if (this.answerIsInt()) {
        this.updateEquation();
        return this.equation;
      }
    }
  }

  returnPossNumList() {
    return [this.coef, this.num, this.num2];
  }

  returnPossOpList() {
    const list = [];
    if (this.op === '+') list.push('-');
    if (this.op === '-') list.push('+');
    if (this.coef !== 0 && this.coef !== 1) list.push('/');
    return list;
  }

  performAddition(amount) {
    this.previousEquation = this.equation;
    this.num += amount;
    this.num2 += amount;
    this.updateEquation();
    console.log(`Added: ${amount} to both sides.`);
  }

  performSubtraction(amount) {
    this.previousEquation = this.equation;
    this.num -= amount;
    this.num2 -= amount;
    this.updateEquation();
    console.log(`Subtracted: ${amount} from both sides.`);
  }

  performDivision(amount) {
    this.previousEquation = this.equation;
    this.num /= amount;
    this.num2 /= amount;
    this.updateEquation();
    console.log(`Divided: ${amount} on both sides.`);
  }

  isFinalSolution() {
    return this.equation === `x = ${this.num2}`;
  }
}

const equation = new LinearEquation();
let count = 0;

while (!equation.isFinalSolution()) {
  if (count === 0) {
    console.log(equation.createRandEquation());
  }
  const possNums = equation.returnPossNumList();
  const possOps = equation.returnPossOpList();
  const value = parseInt(prompt(`Choose a number: ${possNums.join(', ')}`), 10);
  const operation = prompt(`Choose an operation: ${possOps.join(', ')}`);

  switch (operation) {
    case '+':
      equation.performAddition(value);
      break;
    case '-':
      equation.performSubtraction(value);
      break;
    case '/':
      equation.performDivision(value);
      break;
  }

  console.log(equation.returnEquation());
  count++;
}
