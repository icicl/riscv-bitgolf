const title="Contains Own Hex";
const url="contains_own_hex";
const summary="Determine if the decimal representation of a number contains the hexadecimal representation of itself as a substring.";
const details="For example 357445 = 0x57445, and \"57445\" is a substring of \"357445\"";
const constraints="0 <= <b>n</b> < 2^32";
const difficulty=['Proficient', 'purple', '#a8a'];
const input_type = "int";
const tests=[[[0], 1], [[7], 1], [[9], 1], [[357445], 1], [[357439], 0], [[1081713], 1], [[111111], 0], [[2182104649], 1], [[2182104650], 0], [[7950400], 1]];