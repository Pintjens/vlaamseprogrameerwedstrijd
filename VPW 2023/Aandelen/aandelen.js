const ll = require("lazylines");
process.stdin.resume();
const input = new ll.LineReadStream(process.stdin);

let numberOfTests = 0;
let numberOfValues = null;
let startCapital = null;
let tests = [];

input.on("line", l => {
    const line = ll.chomp(l);

    if (numberOfTests == 0) {
        numberOfTests = +line;
    }
    else {

        if (startCapital == null) {
            startCapital = +line;
        }
        else if (numberOfValues == null) {
            numberOfValues = +line;
        }
        else {
            let values = line.split(" ").map(x => +x);
            let test = {
                startCapital: startCapital,
                values: values,
            }
            tests.push(test);

            startCapital = null;
            numberOfValues = null;
            numberOfTests--;
        }
    }

    if (numberOfTests === 0) {
        process.exit();
    }
})

function calc(test) {
    
    if (test.values.length <= 1) {
        // if there is only one (or no) value, nothing will be bought or sold
        // the end capital will be the start capital
        return test.startCapital;
    }
    
    let remainingCapital = BigInt(test.startCapital);
    let shares = BigInt(0);
    let buyPrice = BigInt(0);

    for(let i = 0; i < test.values.length; i++){

        currentStockRate = test.values[i];
        futureStockRate = test.values[i+1] || 0;


        // BUY ?
        if(shares == 0){
            if(currentStockRate < futureStockRate){
                //console.log(`--- funds: ${remainingCapital}`);
                buyPrice = currentStockRate;
                shares = Math.floor(remainingCapital / buyPrice);
                remainingCapital = remainingCapital%buyPrice;


                
                
                //console.log(`${shares} shares bought at ${buyPrice}/share`);
                //console.log(`remaining funds: ${remainingCapital}`);
            }
        }
        // SELL ?
        else{ 
            if(currentStockRate >= futureStockRate){
                remainingCapital += shares * currentStockRate;
                //console.log(`Sold off ${shares} at ${currentStockRate}/share`);
                shares = 0;
            }
        }
    }

    //console.log(`Final capital acquired ${remainingCapital}`);
    return remainingCapital;
}

process.on("exit", () => {
    tests.forEach((test, i) => {
        console.log(`${i + 1} ${calc(test)}`);
    })
})