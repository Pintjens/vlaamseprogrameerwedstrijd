const { log } = require("console");
var ll = require("lazylines");


process.stdin.resume();

var nbrOfLists = null;
var nbrOfItems = null;
var lists = [];
var thisList = [];

new ll.LineReadStream(process.stdin).on("line", function (line = ll.chomp(l)) {
    
    if(nbrOfLists == null) nbrOfLists = line;
    else if(nbrOfItems == null) nbrOfItems = line
    else if(thisList.length < nbrOfItems){

        thisList.push(+line)

        if(thisList.length == nbrOfItems){
            lists.push([...thisList]);
            thisList = [];
            nbrOfItems = null;

        if(lists.length == nbrOfLists) process.exit();
        };
    }
});

process.on("exit", function () {
    // output
    lists.forEach((list, i) => {
        console.log(`${i + 1} ${Math.min(...list)} ${Math.max(...list)}`);
    })
});