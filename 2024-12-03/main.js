const fs = require("node:fs");
const regPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
fs.readFile("./input.txt","utf-8",(err,data) => {
    if(err){
        console.log(err);
        return;
    }
    var matches = data.matchAll(regPattern);
    var sumOfProds = 0;
    matches.forEach(x => {
        sumOfProds += ~~x[1]*~~x[2];
        console.log(`${x[1]}*${x[2]} = ${~~x[1]*~~x[2]}`);
    });
    console.log(sumOfProds);

    // first we need to get all instances of mul(/d,/d) and sum the product of the digits
    // Regex is my first thought, this solution follows a pattern of mul(NUM,NUM) and it cannot deviate from it to be included.
    // the numbers are also 1 to 3 digits long. What about leading 0s? are those possible in the input, since simplified would still lead to a 3 digit number?
    
});
