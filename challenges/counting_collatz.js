const title="Counting Collatz";
const url="counting_collatz";
const summary="For a given number, count how many iterations of the Collatz sequence it takes to reach one.";
const details="Starting with a number <b>n</b>, the next term in the Collatz sequence is given by <b>3n+1</b> if <b>n</b> is odd, or <b>n/2</b> if <b>n</b> is even. It is conjectured that all starting values will eventually reach the loop <b>1 -> 4 -> 2 -> 1 -> ...</b>.";
const constraints="<b>0 < n < 2^32</b>";
const difficulty=['Intermediate', 'gold', '#ff8'];
const input_type = "int";
const tests=[[[1], 0], [[5], 5], [[4294896353], 588], [[67], 27], [[23181], 144], [[16], 4], [[1234], 132], [[2863311531], 254]];