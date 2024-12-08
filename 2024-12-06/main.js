const fs = require("node:fs");
const { stdout } = require("node:process");

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // lets represent the game board as a matrix for sake of ease. First, we need to find the "^" in the data.
    var guardLocation = [-1, -1]; //location in row,col order
    var playArea = data.split("\n");
    playArea.forEach((row, index) => {
        if (row === "") {
            playArea.pop();
            return;
        }
        if (row.includes("^")) {
            guardLocation[0] = index;
            guardLocation[1] = row.indexOf("^");
        }
        playArea[index] = row.split("");
        console.log(row);
    });

    console.log(`Start location is ${guardLocation}`);
    // now, we need to move the character.
    // the guard will move forward until it hits a #, then it will turn right.
    // the guard will finish the puzzle when she leaves the map (e.g. is out of bounds)
    var direction = [-1, 0]; // we start by moving row wise
    var moves = 0;
    while (0 <= guardLocation[0] && guardLocation[0] < playArea.length && 0 <= guardLocation[1] && guardLocation[1] < playArea[1].length) {
        // we need to move upward.
        var i = guardLocation[0] + direction[0];
        var j = guardLocation[1] + direction[1];
        // we have hit the edge on the next move
        if (i === playArea.length || j === playArea.length || i === -1 || j === -1) {
            playArea[guardLocation[0]][guardLocation[1]] = "X";
            guardLocation[0] = i;
            guardLocation[1] = j;
            moves++;
            continue;
        }
        // in the below case, we have hit something and need to turn 
        if (playArea[i][j] === "#") {
            // how does one rotate a 1x2 matrix right? we represent it in math below 
            //
            // |X| * | cosX  -sinX |
            // |Y|   | sinX   cosX |
            // since this is for an anticlockwise (left) turn, we use 270 instead of 90.
            // this means cos(270) = 0 and sin(270) = -1
            // |X| * | 0  1 |
            // |y|   |-1  0 |
            // X = xcosT - ysinT = -ysinT = y
            // Y = xsinT + ycosT = xsinT  = -x
            // that was a lot of work to remember rotations
            var x = direction[0];
            direction[0] = direction[1];
            direction[1] = 0 - x;
            continue; // turn then start next iteration.
        }
        if (playArea[guardLocation[0]][guardLocation[1]] !== "X") {
            moves++;
            playArea[guardLocation[0]][guardLocation[1]] = "X";
        }
        // playArea[i][j] = "^"; // For debugging moves, this can be put back but will make the count incorrect
        guardLocation[0] = i;
        guardLocation[1] = j;
    }
    // print the final state for debugging
    for (var i = 0; i < playArea.length; i++) {
        for (var j = 0; j < playArea[i].length; j++) {
            process.stdout.write(playArea[i][j]);
        }
        console.log();
    }
    // part one soln, I have no idea where to start with part 2 and finding where something needs to be placed to create a loop
    // maybe its similar to finding loops in a linked list? Maybe a change in data model would help?
    console.log(`Final state took ${moves} moves`);
});
