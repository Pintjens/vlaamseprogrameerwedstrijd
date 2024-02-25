const ll = require("lazylines");
process.stdin.resume();

let nbrOfTests = 0;
let lengthOfTestRound = 0;
let nbrOfProgrammers = 0;
let results = [];

new ll.LineReadStream(process.stdin).on("line", (l) => {
    let line = ll.chomp(l);

    if( nbrOfTests == 0) nbrOfTests = +line;
    else if(lengthOfTestRound == 0){
        lengthOfTestRound = +line.split(" ")[1];
        nbrOfProgrammers = line.split(" ")[0];
    }
    else
    {
        let scores = line.split(" ");
        //console.log(scores.length);
        let targetScore = Math.max(...scores.slice(0, lengthOfTestRound));

        console.log(scores[nbrOfProgrammers-1]);
        console.log(scores.length);

        for(let i = lengthOfTestRound; i < nbrOfProgrammers; i++){

            if(scores[i] >= targetScore || i == nbrOfProgrammers-1){
                results.push(i+1 + " " + scores[i]);
                break;
            }   
        }

        nbrOfTests--;

        if (nbrOfTests == 0) {
            process.exit();
        }

        lengthOfTestRound = 0;
    }

})

process.on("exit", () => {
    results.forEach((result, i) => {
        console.log(i+1 + " " + result.split(" ")[0] + " " + result.split(" ")[1]);
    });
})