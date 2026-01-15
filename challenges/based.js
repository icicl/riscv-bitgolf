const title="Based";
const url="based";
const summary="Determine the integer represented by a string, in a given base.";
const details="You are given two strings - the first is the value you want to determine. The second is the base. The base is given as a string in base 10.";
const constraints="The input strings contain only characters 0-9, a-z, and A-Z (lower- and upper-case letters have the same value). The base will be between 2 and 36. The result will be non-negative and less than 2^32.";
const difficulty=['Intermediate', 'gold'];
const input_type = "str";
const tests=[[['100', '2'], 4], [['100', '10'], 100], [['100', '16'], 256], [['0', '17'], 0], [['SAND', '30'], 765703], [['sand', '36'], 1320169], [['ffffffff', '16'], 4294967295]];