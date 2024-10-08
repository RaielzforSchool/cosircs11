class LinearEquation {
  constructor() {
    this.coef = undefined;     // coefficient of x
    this.var = 'x';            // variable (x)
    this.num = undefined;      // number on the same side as the variable
    this.op = undefined;       // operator (+ or -)
    this.num2 = undefined;     // number on the other side of the equation
    this.equation = '';        // current equation
    this.previousEquation = ''; // previous equation
  }

  updateEquation() {
    if (this.coef === undefined || this.op === undefined || this.num === undefined || this.num2 === undefined) {
      throw new Error("Equation parameters are not fully initialized");
    }

    if (this.coef === 0) {
      throw new Error("Coefficient cannot be zero in a valid linear equation.");
    }

    // Format the equation properly with negative numbers
    if (this.coef === 1) {
      if (this.num < 0) {
        this.equation = `${this.var} - ${Math.abs(this.num)} = ${this.num2}`;
      } else {
        this.equation = `${this.var} ${this.op} ${this.num} = ${this.num2}`;
      }
    } else {
      if (this.num < 0) {
        this.equation = `${this.coef}${this.var} - ${Math.abs(this.num)} = ${this.num2}`;
      } else {
        this.equation = `${this.coef}${this.var} ${this.op} ${this.num} = ${this.num2}`;
      }
    }

    // Log the updated equation to console
    console.log(`Updated Equation: ${this.equation}`);
    this.displayEquations();
  }

  displayEquations() {
    const currentEqElement = document.getElementById('currentEquation');
    const previousEqElement = document.getElementById('previousEquation');

    if (!currentEqElement || !previousEqElement) {
      throw new Error('HTML elements for displaying equations are not found.');
    }

    currentEqElement.innerText = `Current Equation: ${this.equation}`;
    previousEqElement.innerText = `Previous Equation: ${this.previousEquation || 'None'}`;
  }

  performAddition(amount) {
    if (!Number.isFinite(amount)) throw new Error('Invalid amount for addition');
    this.previousEquation = this.equation;
    this.num += amount;
    this.num2 += amount;
    console.log(`Performing Addition: Added ${amount} to both sides`);
    this.updateEquation();
  }

  performSubtraction(amount) {
    if (!Number.isFinite(amount)) throw new Error('Invalid amount for subtraction');
    this.previousEquation = this.equation;
    this.num -= amount;
    this.num2 -= amount;
    console.log(`Performing Subtraction: Subtracted ${amount} from both sides`);
    this.updateEquation();
  }

  performDivision(amount) {
    if (amount === 0) throw new Error('Division by zero is not allowed');
    if (!Number.isFinite(amount)) throw new Error('Invalid amount for division');
    this.previousEquation = this.equation;
    this.num /= amount;
    this.num2 /= amount;
    console.log(`Performing Division: Divided both sides by ${amount}`);
    this.updateEquation();
  }

  createRandEquation() {
    let attempts = 0;
    const maxAttempts = 100; // Avoid infinite loop

    while (attempts < maxAttempts) {
      this.coef = Math.floor(Math.random() * 10) + 1; // Ensure coef is never 0
      this.num = Math.floor(Math.random() * 21) - 10; // Allow negative numbers
      this.num2 = Math.floor(Math.random() * 21) - 10;
      this.op = Math.random() > 0.5 ? '+' : '-';
      
      if (this.answerIsInt()) {
        this.updateEquation();
        return this.equation;
      }

      attempts++;
    }
    
    console.warn('Max attempts reached: Unable to generate a valid equation');
    throw new Error('Failed to generate a valid equation after many attempts.');
  }

  answerIsInt() {
    if (this.op === '+') {
      return (this.num2 - this.num) % this.coef === 0;
    } else if (this.op === '-') {
      return (this.num2 + this.num) % this.coef === 0;
    }
    return false;
  }
}

// Instantiate and attach event listeners
const equation = new LinearEquation();

document.getElementById('submitBtn').addEventListener('click', () => {
  const value = parseInt(document.getElementById('valueInput').value, 10);
  const operation = document.getElementById('operationInput').value;

  if (isNaN(value)) {
    alert('Please enter a valid number');
    return;
  }

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
    default:
      alert('Please select a valid operation');
      break;
  }

  document.getElementById('valueInput').value = '';
  document.getElementById('operationInput').value = '';
});

// Initialize with a random equation
equation.createRandEquation();
