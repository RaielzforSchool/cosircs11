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
        if (equation.a > 0)
            leftSide += (equation.a === 1 ? 'x' : `${equation.a}x`); // Show 'x' for a = 1
        else 
           leftSide += (equation.a === -1 ? '-x' : `${equation.a}x`); // Show 'x' for a = 1
    }
    if (equation.b !== 0) {
        if (equation.a !== 0) {
            // Only add the + sign if a term is already there (for 'a * x')
            leftSide += (equation.b > 0 ? ` + ${equation.b}` : ` - ${Math.abs(equation.b)}`);
        } else {
            // No need for '+' when there's only one positive number (b)
            leftSide += `${equation.b}`;
        }
    }

    // Format the right side (c * x + d)
    let rightSide = '';
    if (equation.c !== 0) {
        if (equation.c > 0)
            rightSide += (equation.c === 1 ? 'x' : `${equation.c}x`); // Show 'x' for c = 1
        else 
           rightSide += (equation.c === -1 ? '-x' : `${equation.c}x`); // Show 'x' for c = 1
    }
    if (equation.d !== 0) {
        if (equation.c !== 0) {
            // Only add the + sign if a term is already there (for 'c * x')
            rightSide += (equation.d > 0 ? ` + ${equation.d}` : ` - ${Math.abs(equation.d)}`);
        } else {
            // No need for '+' when there's only one positive number (d)
            rightSide += `${equation.d}`;
        }
    }

    // If there's nothing on either side, default to 0
    if (leftSide === '') leftSide = '0';
    if (rightSide === '') rightSide = '0';

    // Remove leading '+' if there's no variable part (i.e., avoid showing '+2 = ...')
    if (equation.a === 0){
        leftSide = leftSide.replace(`+ ${equation.b}`, equation.b);
    }
    if (equation.c === 0) {
        rightSide = rightSide.replace(`+ ${equation.d}`, equation.d);
    }
    document.getElementById('equation').innerText = `${leftSide} = ${rightSide}`;
}


// Initialize equation and set up display
let equation = generateEquation();
let userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
displayEquation(userEquation);

function performOperation() {
    const input = document.getElementById("operationInput").value.trim();
    const parts = input.split(' ');

    // Validate input
    if (!parts[0] || (!['subtract', 'add'].includes(parts[0].toLowerCase()) && isNaN(parts[1]))) {
        document.getElementById("status").innerText = "Invalid input. Use 'add [coefficient]x' or 'subtract [coefficient]x', or perform regular operations like 'add', 'subtract', 'multiply', 'divide' followed by a number.";
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
                    return;
                }
                userEquation.a /= num;
                userEquation.b /= num;
                userEquation.c /= num;
                userEquation.d /= num;
                break;
            default:
                document.getElementById("status").innerText = "Invalid operation. Try again.";
                return;
        }
    }

    // Update the equation display
    displayEquation(userEquation);

    // Check if the equation is reduced to x = [correct answer] or [correct answer] = x
    let equationSolvedForm1 = userEquation.a === 1 && userEquation.c === 0 && userEquation.b === 0 && userEquation.d === equation.x;
    let equationSolvedForm2 = userEquation.a === 0 && userEquation.c === 1 && userEquation.b === equation.x && userEquation.d === 0;

    if (equationSolvedForm1 || equationSolvedForm2) {
        document.getElementById("equation").innerText = `x = ${equation.x}`;
        document.getElementById("status").innerText = `Correct! The solution is x = ${equation.x}.`;
    } else {
        document.getElementById("status").innerText = "Not done yet!";
    }

    // Clear input
    document.getElementById("operationInput").value = '';
    document.getElementById("operationInput").focus(); // Ensure the input box is focused for the next input
}

// Function to generate a new equation and reset the game
function generateNewEquation() {
    equation = generateEquation();
    userEquation = { a: equation.a, b: equation.b, c: equation.c, d: equation.d };
    displayEquation(userEquation);
    document.getElementById("status").innerText = ''; // Clear status message
    document.getElementById("operationInput").value = ''; // Clear input field
}
