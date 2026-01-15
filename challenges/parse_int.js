const title="Parse Int";
const url="parse_int";
const summary="Determine the value of a string representing an integer in binary, octal, decimal, or hexadecimal.";
const details="You are given a string with one of the four following formats:<br><br><b>0x[0-9a-fA-F]+</b> - a hexadecimal number<br><b>0b[01]+</b> - a binary number<br><b>0o[0-7]+</b> - an octal number<br><b>(0|[1-9][0-9]*)</b> - a decimal number, no leading zeros allowed<br><br>Parse the input string and return the equivalent decimal value.";
const constraints="The input strings contain only characters 0-9, a-f, and A-F (lower- and upper-case letters have the same value). The input is guarranteed to be a valid number, matching one of the above formats. The result will be non-negative and less than 2^32.";
const difficulty=['Intermediate', 'gold', '#ff8'];
const input_type = "str";
const tests=[[['0'], 0], [['0xfF'], 255], [['77'], 77], [['0b0000101'], 5], [['0o321'], 209], [['0x01234567'], 19088743], [['0x89abcdef'], 2309737967], [['4294967295'], 4294967295], [['0xffffffff'], 4294967295], [['0b11111111111111111111111111111111'], 4294967295], [['0o37777777777'], 4294967295]];