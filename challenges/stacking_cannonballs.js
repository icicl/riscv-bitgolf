const title="Stacking Cannonballs";
const url="stacking_cannonballs";
const summary="Determine the number of cannonballs in a triangular pyramid.";
const details="Cannonballs are stacked in a pile as follows: the top layer has exactly one, then the layer below that has 3 in a triangle, then the next layer has 6, then 10, etc. Given the height of the pile <b>n</b>, find how many cannonballs there are in total <b>C(n)</b>.";
const constraints="<b>n >= 0</b>; <b>C(n) < 2^32";
const difficulty=['Beginner', 'green', '#8f8'];
const input_type = "int";
const tests=[[[0], 0], [[1], 1], [[2], 4], [[3], 10], [[4], 20], [[10], 220], [[250], 2635500], [[2952], 4291795704]];