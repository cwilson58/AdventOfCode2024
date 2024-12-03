const fs = require("node:fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    // Puzzle inputs are CSV format with a space delimiter
    var rows = data.split("\n");
    var counter = 0;
    // a row is safe when all of its inputs are going in the same direction and have a delta of [1, 3]
    rows.forEach((report) => {
        if (report == "") return;
        var levels = report.split(" ");
        var direction = ~~levels[0] - ~~levels[1]; // all differences must be the same sign to be safe
        var delta = Math.abs(direction);
        if (delta > 3 || delta < 1) {
            return; // do not continue, the first delta is already outside of [1,3]
        }
        // iterate backwards through the list to catch edge easier
        for (let i = 1; i < levels.length - 1; i++) {
            var difference = levels[i] - levels[i + 1];
            var change = Math.abs(difference);
            if (!((direction > 0 && difference > 0) || (direction < 0 && difference < 0)) || !(change >= 1 && change <= 3)) {
                return;
            }
        }
        counter++;

    });
    console.log(`The number of safe reports is ${counter}`);
});

