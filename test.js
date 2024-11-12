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


// Initialize equation and set up display
let equation = generateEquation();
let userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
displayEquation(userEquation);

// Function to display the equation and update button labels
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

    // Update button labels with current values
    document.getElementById("btn-a").innerText = equation.a;
    document.getElementById("btn-ax").innerText = `${equation.a}x`;
    document.getElementById("btn-b").innerText = Math.abs(equation.b);
    document.getElementById("btn-cx").innerText = `${equation.c}x`;
    document.getElementById("btn-c").innerText = equation.c;
    document.getElementById("btn-d").innerText = Math.abs(equation.d);
}

// Update insertVariable function to use button values directly
function insertVariable(variable) {
    const input = document.getElementById("operationInput");
    const value = document.getElementById(`btn-${variable}`).innerText; // Get button text as value
    input.value += value; // Append the variable text to the current input value
    input.focus(); // Set focus to the input box for convenience
}

// Call displayEquation when generating a new equation
function generateNewEquation() {
    equation = generateEquation();
    userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
    displayEquation(userEquation);
    document.getElementById("status").innerText = ''; // Clear status message
    document.getElementById("operationInput").value = ''; // Clear input field
}

function insertOperation(operation) {
    const input = document.getElementById("operationInput");
    input.value = operation + ' '; // Insert the operation with a space for user input
    input.focus(); // Set focus to the input box for convenience
}

// Function to insert a variable text into the input field
function insertVariable(variable) {
    const input = document.getElementById("operationInput");
    input.value += variable; // Append the variable text to the current input value
    input.focus(); // Set focus to the input box for convenience
}