const title="Fibonacci";
const url="fibonacci";
const summary="Calculate the nth Fibonacci number using machine code with as few <b>'1'</b> bits as possible.";
const details="The Fibonacci sequence is given by <b>F(0) = 0</b>, <b>F(1) = 1</b>, and <b>F(n) = F(n-1) + F(n-2)</b>, where <b>n > 2</b>. As input, you are given an integer <b>n</b>. Output the nth Fibonacci number <b>F(n)</b>.";
const constraints="<b>n >= 0</b><br><b>F(n) < 2^32</b>";
const difficulty=['Beginner', 'green', '#8f8'];
const input_type = "int";
const tests=[[[0], 0], [[1], 1], [[2], 1], [[11], 89], [[31], 1346269], [[44], 701408733]];