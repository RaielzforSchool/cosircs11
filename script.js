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


let stepcount = 0;
// Function to handle user operations
function performOperation() {
   
    stepcount += 1;
    document.getElementById("StepCounter").innerText = `Step: ${stepcount}`;
    const input = document.getElementById("operationInput").value.trim();
    const parts = input.split(' ');


    if (!parts[0] || (!['subtract', 'add'].includes(parts[0].toLowerCase()) && isNaN(parts[1]))) {
        document.getElementById("status").innerText = "Invalid input. Use 'add [coefficient]x' or 'subtract [coefficient]x', or perform regular operations like 'add', 'subtract', 'multiply', 'divide' followed by a number.";
        stepcount -= 1;
        return;
    }


    // Handle input like "add 2x" or "subtract x"
    if (parts.length === 2 && (parts[1].endsWith('x') || parts[1] === 'x')) {
        const operation = parts[0].toLowerCase();
        let coefficient = parts[1].replace('x', ''); // Extract the coefficient part (remove 'x')
       
        // If the coefficient is empty, default to 1 (e.g., "subtract x" or "add x")
        coefficient = coefficient === '' ? 1 : parseInt(coefficient, 10);
       
        if (isNaN(coefficient)) {
            document.getElementById("status").innerText = "Invalid coefficient. Please try again.";
            stepcount -= 1;
            return;
        }


        // Perform the operation based on 'add' or 'subtract'
        if (operation === 'subtract') {
            userEquation.a -= coefficient;
            userEquation.c -= coefficient;
        } else if (operation === 'add') {
            userEquation.a += coefficient;
            userEquation.c += coefficient;
        }


    } else {
        // Handle regular operations (add, subtract, multiply, divide) followed by a number
        const operation = parts[0];
        const num = parseInt(parts[1], 10);


        if (isNaN(num)) {
            document.getElementById("status").innerText = "Invalid number. Please try again.";
            stepcount -= 1;
            return;
        }


        switch (operation.toLowerCase()) {
            case 'add':
                userEquation.b += num;
                userEquation.d += num;
                break;
            case 'subtract':
                userEquation.b -= num;
                userEquation.d -= num;
                break;
            case 'multiply':
                userEquation.a *= num;
                userEquation.b *= num;
                userEquation.c *= num;
                userEquation.d *= num;
                break;
            case 'divide':
                if (num === 0) {
                    document.getElementById("status").innerText = "Cannot divide by zero!";
                    stepcount -= 1;
                    return;
                }
                userEquation.a /= num;
                userEquation.b /= num;
                userEquation.c /= num;
                userEquation.d /= num;
                break;
            default:
                document.getElementById("status").innerText = "Invalid operation. Try again.";
                stepcount -= 1;
                return;
       
        }
        document.getElementById("StepCounter").innerText = `Step: ${stepcount}`;
    }


    // Update the equation display
    displayEquation(userEquation);


   // Check if the equation is reduced to x = [correct answer] or [correct answer] = x
   let solved = false;
    if ((userEquation.a === 1 && userEquation.c === 0 && userEquation.b === 0) || (userEquation.a === 0 && userEquation.c === 1 && userEquation.d === 0)) {
       solved = true;
       document.getElementById("StepCounter").innerText = `Step: ${stepcount}`;
    }
    if (solved) {
        document.getElementById("equation").innerText = `x = ${equation.x}`;
        document.getElementById("status").innerText = `Correct! The solution is x = ${equation.x}.`;
        document.getElementById("StepCounter").innerText = `Step: ${stepcount}`;
        return;
    }
    else {
        document.getElementById("status").innerText = "Not done yet!";
    }


     // Update the equation display
     displayEquation(userEquation);


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
    stepcount = 0;
    document.getElementById("StepCounter").innerText = `Step: ${stepcount}`;


}
function insertOperation(operation) {
    const input = document.getElementById("operationInput");
    input.value = operation + ' '; // Insert the operation with a space for user input
    input.focus(); // Set focus to the input box for convenience
}


