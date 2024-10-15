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
    let leftSide = '';
    if (equation.a !== 0) {
        leftSide += (equation.a === 1 ? 'x' : `${equation.a}x`);
    }
    if (equation.b !== 0) {
        leftSide += (equation.b > 0 ? ` + ${equation.b}` : ` - ${Math.abs(equation.b)}`);
    }

    let rightSide = '';
    if (equation.c !== 0) {
        rightSide += (equation.c === 1 ? 'x' : `${equation.c}x`);
    }
    if (equation.d !== 0) {
        rightSide += (equation.d > 0 ? ` + ${equation.d}` : ` - ${Math.abs(equation.d)}`);
    }

    if (leftSide === '') leftSide = '0';
    if (rightSide === '') rightSide = '0';

    document.getElementById('equation').innerText = `${leftSide} = ${rightSide}`;
}

// Initialize equation and set up display
let equation = generateEquation();
let userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
displayEquation(userEquation);

// Function to handle user operations
function performOperation(operator) {
    const input = document.getElementById("operationInput").value.trim();
    
    if (!input) {
        document.getElementById("status").innerText = "Please enter a valid number or term.";
        return;
    }

    // Check if input contains 'x' (it's a term like 2x)
    let isTerm = input.includes('x');
    let coefficient = isTerm ? input.replace('x', '') : input;
    coefficient = coefficient === '' ? 1 : parseFloat(coefficient);

    if (isNaN(coefficient)) {
        document.getElementById("status").innerText = "Invalid input. Please try again.";
        return;
    }

    // Apply operation based on input and the selected operator
    switch (operator) {
        case '+':
            if (isTerm) {
                userEquation.a += coefficient;
                userEquation.c += coefficient;
            } else {
                userEquation.b += coefficient;
                userEquation.d += coefficient;
            }
            break;
        case '-':
            if (isTerm) {
                userEquation.a -= coefficient;
                userEquation.c -= coefficient;
            } else {
                userEquation.b -= coefficient;
                userEquation.d -= coefficient;
            }
            break;
        case '*':
            userEquation.a *= coefficient;
            userEquation.b *= coefficient;
            userEquation.c *= coefficient;
            userEquation.d *= coefficient;
            break;
        case '/':
            if (coefficient === 0) {
                document.getElementById("status").innerText = "Cannot divide by zero!";
                return;
            }
            userEquation.a /= coefficient;
            userEquation.b /= coefficient;
            userEquation.c /= coefficient;
            userEquation.d /= coefficient;
            break;
        default:
            document.getElementById("status").innerText = "Invalid operation.";
            return;
    }

    // Update the equation display
    displayEquation(userEquation);

    // Check if equation is solved (x = solution form)
    const equationSolvedForm1 = userEquation.a === 1 && userEquation.c === 0 && userEquation.b === equation.x && userEquation.d === 0;
    const equationSolvedForm2 = userEquation.a === 0 && userEquation.c === 1 && userEquation.b === 0 && userEquation.d === equation.x;

    if (equationSolvedForm1 || equationSolvedForm2) {
        document.getElementById("equation").innerText = `x = ${equation.x}`;
        document.getElementById("status").innerText = `Correct! The solution is x = ${equation.x}.`;
    } else {
        document.getElementById("status").innerText = "Not done yet!";
    }

    // Clear input
    document.getElementById("operationInput").value = '';
}

// Function to generate a new equation and reset the game
function generateNewEquation() {
    equation = generateEquation();
    userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
    displayEquation(userEquation);
    document.getElementById("status").innerText = ''; // Clear status message
    document.getElementById("operationInput").value = ''; // Clear input field
}