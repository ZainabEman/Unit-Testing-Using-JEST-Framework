const validateInput = require('./validateInput.js');

test('input should be valid and return true', () => {
  const input = '100';
  const result = validateInput(input);
  expect(result.isValid).toBe(true);
});

describe('validateInput', () => {
    // Existing test cases (assuming you've already covered cases like empty input, valid integer input)

    test('should return error for non-integer input', () => {
        const result = validateInput("12.5");
        expect(result).toEqual({
            isValid: false,
            error: "Please enter a whole number."
        });
    });

    // Additional case for a valid integer input, for completeness
    test('should return valid result for integer input', () => {
        const result = validateInput("10");
        expect(result).toEqual({
            isValid: true,
            value: 10
        });
    });

    // Additional edge case for non-numeric input
    test('should return error for non-numeric input', () => {
        const result = validateInput("abc");
        expect(result).toEqual({
            isValid: false,
            error: "Invalid input format."
        });
    });
});

describe('validateInput', () => {
  // Test case for empty input
  test('should return error for empty input', () => {
      const result = validateInput("");
      expect(result).toEqual({
          isValid: false,
          error: "No amount entered. Please enter a valid number."
      });
  });

  // Test case for null input
  test('should return error for null input', () => {
      const result = validateInput(null);
      expect(result).toEqual({
          isValid: false,
          error: "No amount entered. Please enter a valid number."
      });
  });

  // Test case for undefined input
  test('should return error for undefined input', () => {
      const result = validateInput(undefined);
      expect(result).toEqual({
          isValid: false,
          error: "No amount entered. Please enter a valid number."
      });
  });

  
});
