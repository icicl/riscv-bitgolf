const title="Multiply";
const url="multiply";
const summary="Multiply two numbers together.";
const details="Calculate the product of two numbers <b>a</b> * <b>b</b>.";
const constraints="Input: [a, b]<br>0 <= <b>a</b>*<b>b</b> < 2^32";
const difficulty=['Intermediate', 'gold', '#ff8'];
const input_type = "int";
const tests=[[[7, 10], 70], [[0, 999], 0], [[1023, 1025], 1048575], [[65535, 65535], 4294836225], [[4275861367, 1], 4275861367], [[1, 4275861367], 4275861367]];