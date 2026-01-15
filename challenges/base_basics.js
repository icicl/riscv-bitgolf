const title="Base Basics";
const url="base_basics";
const summary="Determine the integer represented by a string, in a given base.";
const details="You are given a null-terminated string containing two values separated by a comma - the first is the value you want to determine. The second is the base. The base is given in base 10.";
const constraints="The input string contain only characters 0-9, a-z, A-Z and a comma (lower- and upper-case letters have the same value). The base will be between 2 and 36. The result will be non-negative and less than 2^32.";
const difficulty=['Intermediate', 'gold', '#ff8'];
const input_type = "str";
const tests=[[['100,2'], 4], [['100,10'], 100], [['100,16'], 256], [['0,17'], 0], [['SAND,30'], 765703], [['sand,36'], 1320169], [['ffffffff,16'], 4294967295]];