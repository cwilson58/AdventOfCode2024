const fs = require("node:fs");

let printRules = new Map();
let printOrders = [];

// thought 1: we get things in the order of FIRST|SECOND so if we create a map with FIRST -> [COMES AFTER] we can just access all of them with a hash
// we use two pointers, 1 that is the current place and 2 that is looking at the rules
// if the rules for the second pointer say first pointer should come second, its invalid.

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    // here we need to read all the page order rules in the form of NUM|NUM
    // Then we need to read in the print orders
    let lines = data.split("\n");
    let isRule = true;
    lines.forEach((line) => {
        if (line === "") {
            isRule = false;
            return; // end this iteration
        }
        if (isRule) {
            var numbers = line.split("|");
            if (printRules.has(~~numbers[0])) {
                printRules.get(~~numbers[0]).push(~~numbers[1]);
            } else {
                printRules.set(~~numbers[0], [~~numbers[1]]);
            }
        } else {
            printOrders.push(line.split(","));
        }
    });
    console.log(printRules);
    console.log(printOrders);

    // now that we have all the rules, we can iterate over each line. NOTE: we could do this with one iteration.
    var count = 0;
    printOrders.forEach((order) => {
        var brokeRule = false;
        for (let i = 0; i < order.length; i++) {
            for (let j = i + 1; j < order.length; j++) {
                // so we have to know if there is a rule where i must come AFTER j.
                if (printRules.has(~~order[j]) && printRules.get(~~order[j]).includes(~~order[i])) {
                    brokeRule = true;
                    break; // it has a rule for j and j's rules state i must come after
                }
            }
        }
        if (brokeRule) {
            console.log(`${order} broke da rules`);
            // TODO: Part 2
        } else {
            count += ~~order[Math.floor(order.length/2)];
            console.log(`${order} passed da rules add ${order[Math.floor(order.length/2)]}`);
        }
    });
    console.log(`The total is ${count}`);
});

