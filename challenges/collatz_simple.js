const title="Collatz Simple";
const url="collatz_simple";
const summary="For a given number, count how many iterations of the Collatz sequence it takes to reach one.";
const details="Starting with a number <b>n</b>, the next term in the Collatz sequence is given by <b>3n+1</b> if <b>n</b> is odd, or <b>n/2</b> if <b>n</b> is even. It is conjectured that all starting values will eventually reach the loop <b>1 -> 4 -> 2 -> 1 -> ...</b>.";
const constraints="10 < C(n, i) < 2^32<b>, for all </b>i<b>, where </b>C(n, i)<b> is the </b>ith<b> term of the Collatz sequence produced from starting value </b>n<b>.";
const difficulty=['Beginner', 'green', '#8f8'];
const input_type = "int";
const tests=[[[1], 0], [[5], 5], [[67], 27], [[23181], 144], [[16], 4], [[1234], 132], [[777], 33], [[2147483648], 31]];