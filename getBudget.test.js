const {
    calculateBudget,
    getBudget,
    deleteItem,
    addItem,
    resetBudget,
    data
} = require('./script.js'); // Adjust the path as needed

describe('getBudget Tests', () => {
    beforeEach(() => {
        // Reset the data object before each test to ensure test isolation
        data.allItems.exp = [];
        data.allItems.inc = [];
        data.totals.exp = 0;
        data.totals.inc = 0;
        data.budget = 0;
        data.percentage = -1;
    });

    test('should return initial state correctly when no transactions are present', () => {
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
        });
    });

    test('should reflect the state accurately after transactions are added', () => {
        addItem('inc', 'Salary', 1000);
        addItem('exp', 'Rent', 500);
        calculateBudget();
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 500,
            totalInc: 1000,
            totalExp: 500,
            percentage: 50
        });
    });

    test('should update correctly after recalculating the budget with new transactions', () => {
        addItem('inc', 'Salary', 1000);
        addItem('exp', 'Utilities', 200);
        calculateBudget();
        addItem('inc', 'Bonus', 500);
        addItem('exp', 'Car Maintenance', 300);
        calculateBudget();
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 1000,
            totalInc: 1500,
            totalExp: 500,
            percentage: 33
        });
    });

    test('should verify that each call to getBudget returns a new object instance', () => {
        const budget1 = getBudget();
        const budget2 = getBudget();
        expect(budget1).not.toBe(budget2);  // Checks that the objects are not the same instance
        expect(budget1).toEqual(budget2);   // Checks that the contents of the objects are the same
    });

    test('should show updated budget after removing a transaction', () => {
        addItem('inc', 'Salary', 1000);
        addItem('exp', 'Rent', 500);
        calculateBudget();
        deleteItem('exp', data.allItems.exp[0].id);
        calculateBudget();
        const updatedBudget = getBudget();
        expect(updatedBudget).toEqual({
            budget: 1000,  // All expenses removed, so budget is total income
            totalInc: 1000,
            totalExp: 0,   // No expenses should be left
            percentage: 0  // No expenses, so percentage is 0
        });
    });

    test('should return initial state correctly when no transactions are present', () => {
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
        });
    });

    test('should handle expenses exceeding income', () => {
        addItem('inc', 'Salary', 2000);
        addItem('exp', 'Mortgage', 2500);
        calculateBudget();
        const budget = getBudget();
        expect(budget).toEqual({
            budget: -500,
            totalInc: 2000,
            totalExp: 2500,
            percentage: 125
        });
    });

    test('should handle adjustments to existing transactions', () => {
        addItem('inc', 'Salary', 2000);
        addItem('exp', 'Rent', 500);
        calculateBudget();
        // Simulating updating an item, direct data manipulation as update functionality not shown
        data.allItems.exp[0].value = 800;
        calculateBudget();
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 1200,
            totalInc: 2000,
            totalExp: 800,
            percentage: 40
        });
    });

    test('should not change the budget if an invalid item ID is used for deletion', () => {
        addItem('inc', 'Salary', 3000);
        addItem('exp', 'Rent', 1000);
        calculateBudget();
        deleteItem('exp', 999); // Non-existent ID
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 2000,
            totalInc: 3000,
            totalExp: 1000,
            percentage: 33
        });
    });


    test('should handle rounding issues in percentage calculations', () => {
        addItem('inc', 'Salary', 3333);
        addItem('exp', 'Groceries', 1111);
        calculateBudget();
        const budget = getBudget();
        expect(budget).toEqual({
            budget: 2222,
            totalInc: 3333,
            totalExp: 1111,
            percentage: 33 // Ensure it rounds to the nearest whole number
        });
    });
    
});
