const title="Stacking Cannonbals";
const url="stacking_cannonbals";
const summary="Determine the number of cannonballs in a triangular pyramid.";
const full="Cannonballs are stacked in a pile as follows: the top layer has exactly one, then the layer below that has 3 in a triangle, then the next layer has 6, then 10, etc. Given the height of the pile `n`, find how many cannonballs there are in total `C(n)`.<br><br>Constraints:<br>`n >= 0`; `C(n) < 2^32";
const tests=[[[0], 0], [[1], 1], [[2], 4], [[3], 10], [[4], 20], [[10], 220], [[250], 2635500], [[2952], 4291795704]];