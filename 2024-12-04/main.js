const fs = require("node:fs");

// Here is what the directions represent. Using a matrix for these, would a tuple be better?
// [-1,-1] [0,-1] [1,-1]
// [-1,0]    X    [1,0]
// [-1,1]  [0,1]  [1,1]
const directions = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]; // set of all possible moves to find XMAS
const targetWord = "XMAS";
fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    // I have no idea where to begin with this, I am going to default to some googling of a similar problem.
    // What is the problem? it's a word search, how do computers solve a word search?
    // We have the brute force method, check every single row, column, and diagonal for XMAS or SAMX but that seems wrong.
    // is this maybe a graph problem? DFS or BFS possible? we have a VERY large graph. ANS: Because this is only straight lines, DFS probably wont work.
    // googling my above leads to this: https://www.youtube.com/watch?v=tiLwW8StyBc
    // problem with the above: Trie data structure is not useful here, we only have two words that only share a second letter.
    // maybe we do want to brute force it, but how do we make sure we only count a word once? XMAS do we store the X and S coordinates as a pair?
    // that would mean that (1,1),(1,4) would represent 1 XMAS going left to right AND right to left. Is that then the key? a set (X,S) in a hashmap?
    var matrix = data.split("\n");
    var wordCount = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === targetWord[0]) { // if we are at the start of XMAS, we can look in all 8 directions for XMAS assuming we don't leave the bounds
                // we know we have an X here
                directions.forEach((delta) => {
                    console.log(delta);
                    var letterIndex = 0; // start looking at the next letter
                    var x = i;
                    var y = j;
                    // while we are in the bounds of the matrix and
                    while (0 <= x && x < matrix.length && 0 <= y && y < matrix[1].length && letterIndex < targetWord.length && matrix[x][y] === targetWord[letterIndex]) {
                        letterIndex += 1;
                        if (letterIndex === targetWord.length) { // we incremented outside the bounds thus we have found XMAS
                            wordCount += 1;
                        }
                        // move x and y
                        x += delta[0];
                        y += delta[1];
                    }
                });
            }
        }
    }
    console.log(`There are ${wordCount} instances of ${targetWord}`);
});
