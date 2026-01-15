const title="Test Primality";
const url="test_primality";
const summary="Determine if a given number is prime.";
const details="An integer is prime if it has exactly two distinct integer divisors: <b>1</b> and itself. Output <b>1</b> if the provided number is prime, and <b>0</b> if it is not.";
const constraints="0 <= n < 2^31";
const difficulty=['Advanced', 'red', '#f88'];
const input_type = "int";
const tests=[[[0], 0], [[1], 0], [[2], 1], [[3], 1], [[4], 0], [[5], 1], [[23], 1], [[91], 0], [[499], 1], [[961], 0], [[1021], 1], [[1226221], 0], [[9972679], 1], [[100000007], 1], [[2089470557], 0], [[2147483647], 1]];