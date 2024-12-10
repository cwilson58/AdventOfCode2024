const fs = require("node:fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // were to start here.....how do we even begin to model this problem?
    // a Matrix seems natural but, maybe there is some other way that would make the straight lines easier?
    // same distance from the ends. These also need to match.
    // first we load this into a matrix. Did some googling, this is a math problem.
    // storing the grid in memory doesn't make sense here when we are already parsing it. Why not just store the location of every non "." char?
    // NOTE: there are only valid characters and . in the input
    var antennaLocations = new Map(); // map makes more sense.
    var rows = data.split("\n");
    var n = rows.length;
    var m = rows[0].length;
    rows.forEach((row, rowIndex) => {
        if (row === "") {
            n -= 1; // remove one row
            return;
        }
        // we need to store the locations of every non .
        columns = row.split("");
        columns.forEach((col, colIndex) => {
            if (col === "" || col === ".") {
                return;
            }
            if(antennaLocations.has(col)){
                antennaLocations.get(col).push([rowIndex,colIndex]);
            } else {
                antennaLocations.set(col, [[rowIndex,colIndex]]);
            }
        });
    });
    var antinodes = new Map();
    antennaLocations.forEach((value,key) => {
        // now we are iterating over all of the matched up antenna
        // we need to match every pair, using a simple 2 pointer method.
        console.log(key);
        for(let i = 0; i < value.length; i++){
            for(let j = i+1; j < value.length; j++){
                // use A,B to get points C and D.
                // check if they are valid, and add to a total for valid ones
                // also check if the point has already been counted.... hmm
                var distX = ~~value[j][0] - ~~value[i][0];
                var distY = ~~value[j][1] - ~~value[i][1];
                var antiC = [~~value[i][0] - distX,~~value[i][1] - distY];
                var antiD = [~~value[j][0] + distX,~~value[j][1] + distY];
                if( 0 <= antiC[0] && antiC[0] < n && 0 <= antiC[1] && antiC[1] < m){
                    console.log(antiC);
                    antinodes.set(`${antiC}`,1);
                }

                if( 0 <= antiD[0] && antiD[0] < n && 0 <= antiD[1] && antiD[1] < m){
                    console.log(antiD);
                    antinodes.set(`${antiD}`,1);
                }
            }
        }
    });
    console.log(antinodes);
    console.log(`There are ${antinodes.size} antinodes in the ${n} x ${m} sized grid`);
});
