// calculateBudget.test.js
const { calculateTotal, calculateBudget, data } = require('./script.js'); 
describe('calculateBudget function', () => {
    beforeEach(() => {
        // Reset the data properties before each test
        data.allItems.exp = [];
        data.allItems.inc = [];
        data.totals.exp = 0;
        data.totals.inc = 0;
        data.budget = 0;
        data.percentage = -1;
    });

    test('should calculate the budget and percentage with no income or expenses', () => {
        calculateBudget();
        expect(data.budget).toBe(0);
        expect(data.percentage).toBe(-1);
    });

    test('should calculate zero percentage when expenses are 0 and income is positive', () => {
        data.allItems.inc.push({ value: 1000 });
        calculateBudget();
        expect(data.budget).toBe(1000);
        expect(data.percentage).toBe(0);
    });

    test('should calculate a correct low percentage when expenses are much lower than income', () => {
        data.allItems.inc.push({ value: 1000 });
        data.allItems.exp.push({ value: 100 });
        calculateBudget();
        expect(data.budget).toBe(900);
        expect(data.percentage).toBe(10);
    });

    test('should calculate a high percentage when expenses are almost as high as income', () => {
        data.allItems.inc.push({ value: 1000 });
        data.allItems.exp.push({ value: 995 });
        calculateBudget();
        expect(data.budget).toBe(5);
        expect(data.percentage).toBe(99);
    });

    test('should handle negative expense values by not crashing and correctly calculating the budget', () => {
        data.allItems.inc.push({ value: 1000 });
        data.allItems.exp.push({ value: -500 });  // Assuming the system should accept negative numbers
        calculateBudget();
        expect(data.budget).toBe(1500); // Income minus a negative expense increases the budget
        expect(data.percentage).toBe(-50); // This is an interesting result and should be defined by business rules
    });

    
});

