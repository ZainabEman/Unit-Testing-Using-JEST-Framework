function validateInput(inputAmount) {
    if (!inputAmount) {
        return { isValid: false, error: "No amount entered. Please enter a valid number." };
    }

    // Attempt to parse the input as a float
    const amount = parseFloat(inputAmount);

    // If parseFloat gives NaN or input is non-numeric, it's an invalid format
    if (isNaN(amount) || !/^-?\d*\.?\d+$/.test(inputAmount)) {
        return { isValid: false, error: "Invalid input format." };
    }

    // Check if the amount is not an integer (float)
    if (!Number.isInteger(amount)) {
        return { isValid: false, error: "Please enter a whole number." };
    }

    return { isValid: true, value: amount };
}

module.exports = validateInput;