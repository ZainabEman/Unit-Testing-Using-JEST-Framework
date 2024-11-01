


function calculateTotal(type) {
    let sum = 0;
    data.allItems[type].forEach(cur => {
        sum += cur.value;
    });
    data.totals[type] = sum;
}

function calculateBudget() {
    calculateTotal('exp');
    calculateTotal('inc');
    data.budget = data.totals.inc - data.totals.exp;
    if (data.totals.inc > 0) {
        // Using Math.floor to always round down
        data.percentage = Math.floor((data.totals.exp / data.totals.inc) * 100);
    } else {
        data.percentage = -1;
    }
}


var data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};

var getBudget = function() {
    return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
    };
};

function addItem(type, description, value) {
    const ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 1;
    data.allItems[type].push({ id: ID, description, value });
    calculateTotal(type);
}
function deleteItem(type, id) {
    var ids = data.allItems[type].map(function(current) {
        return current.id;
    });

    var index = ids.indexOf(id);
    if (index !== -1) {
        data.allItems[type].splice(index, 1);
        calculateTotal(type);
        calculateBudget();
    }
}
module.exports = {
    calculateBudget,
    calculateTotal,
    getBudget,
    addItem,
    deleteItem,
    data
};
