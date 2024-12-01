// First, we need to read in the data from input.txt in the same directory into something we can use.
// Do we go with a simple read -> insert to two lists? Can we mutate the data to be useful?
const fs = require("node:fs");

fs.readFile("./input.txt", 'utf8', (err,data) => {
    if(err) {
        console.log(err);
        return;
    }

    // each row is the position of two lists.
    var lines = data.split("\n");
    var leftList = [];
    var rightList = [];
    lines.forEach((pair) => {
        if(pair === "") return;
        var noSpace = pair.split("   ");
        leftList.push(noSpace[0]);
        rightList.push(noSpace[1]);
    });

    leftList.sort(function (a,b) { return a-b });
    rightList.sort(function (a,b) { return a-b });
    // here I want to take the difference of each item in two lists, we are using multiple iterations here
    var differences = leftList.map( (num, index) => Math.abs(num - rightList[index]));
    var sum = 0;

    differences.forEach(num => sum += num);

    console.log(`Part one Solution is ${sum}`);

    // for part two, I am thinking a map of number => frequency is the way to go. There is probably a way to just construct a hash map for both problems here.
    var freqMap = new Map();
    rightList.forEach((val) => {
        if(freqMap.has(val)){
            freqMap.set(val,~~freqMap.get(val) + 1)
        }
        else {
            freqMap.set(val,1);
        }
    });
    var secondSum = 0;
    leftList.forEach((val) => {
        if(freqMap.has(val)){
            secondSum += val * freqMap.get(val); 
        }
    });
    console.log(`Second Sum is ${secondSum}`);
});
