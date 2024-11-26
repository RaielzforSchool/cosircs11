// Generate random integers between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a solvable equation
function generateEquation() {
    let a, b, c, d, x;

    // Keep generating until we get an integer solution for x
    do {
        a = getRandomInt(1, 10);
        b = getRandomInt(-10, 10);
        c = getRandomInt(1, 10);
        d = getRandomInt(-10, 10);
        x = (d - b) / (a - c);
    } while (!Number.isInteger(x) || a === c); // Ensure it's an integer and a != c

    return { a, b, c, d, x };
}

// Function to display the equation
function displayEquation(equation) {
    // Format the left side (a * x + b)
    let leftSide = '';
    if (equation.a !== 0) {
        leftSide += (equation.a === 1 ? 'x' : `${equation.a}x`); // Show 'x' for a = 1
    }
    if (equation.b !== 0) {
        leftSide += (equation.b > 0 ? ` + ${equation.b}` : ` - ${Math.abs(equation.b)}`);
    }

    // Format the right side (c * x + d)
    let rightSide = '';
    if (equation.c !== 0) {
        rightSide += (equation.c === 1 ? 'x' : `${equation.c}x`); // Show 'x' for c = 1
    }
    if (equation.d !== 0) {
        rightSide += (equation.d > 0 ? ` + ${equation.d}` : ` - ${Math.abs(equation.d)}`);
    }

    // If there's nothing on either side, default to 0
    if (leftSide === '') leftSide = '0';
    if (rightSide === '') rightSide = '0';

    document.getElementById('equation').innerText = `${leftSide} = ${rightSide}`;
}
// Algebra Solver Logic
let currentEquation = { a: 3, b: 2, c: 4, d: -5 }; // Default example equation
let prevEquation = "";

function displayEquation() {
  const { a, b, c, d } = currentEquation;
  const equationString = `${a}x + ${b} = ${c}x + ${d}`;
  document.getElementById("main-equation").innerText = `Equation: ${equationString}`;
}

function updateHistory() {
  document.getElementById("prev-equation").innerText = `Previous Equation: ${prevEquation}`;
}

function setOperation(side, operation) {
    const operationBox = document.getElementById(`${side}-operation`);
    operationBox.value = operation; // Set the operation symbol directly  
}

function applyOperation() {
  const leftOp = document.getElementById("left-operation").value;
  const leftValue = parseInt(document.getElementById("left-value").value) || 0;
  const rightOp = document.getElementById("right-operation").value;
  const rightValue = parseInt(document.getElementById("right-value").value) || 0;

  prevEquation = `${currentEquation.a}x + ${currentEquation.b} = ${currentEquation.c}x + ${currentEquation.d}`;

  if (leftOp && leftValue) {
    applySideOperation('left', leftOp, leftValue);
  }
  if (rightOp && rightValue) {
    applySideOperation('right', rightOp, rightValue);
  }

  displayEquation();
  updateHistory();
  clearInputs();
}

function applySideOperation(side, op, value) {
  if (side === 'left') {
    currentEquation.a = operate(currentEquation.a, op, value);
    currentEquation.b = operate(currentEquation.b, op, value);
  } else if (side === 'right') {
    currentEquation.c = operate(currentEquation.c, op, value);
    currentEquation.d = operate(currentEquation.d, op, value);
  }
}

function operate(term, op, value) {
  switch (op) {
    case '+': return term + value;
    case '-': return term - value;
    case '*': return term * value;
    case '/': return Math.floor(term / value); // Integer division
    default: return term;
  }
}

function generateNewEquation() {
    equation = generateEquation();
    userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
    displayEquation(userEquation);
    document.getElementById("status").innerText = ''; // Clear status message
    document.getElementById("operationInput").value = ''; // Clear input field
}

function clearInputs() {
  document.getElementById("left-operation").value = '';
  document.getElementById("left-value").value = '';
  document.getElementById("right-operation").value = '';
  document.getElementById("right-value").value = '';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize
displayEquation();