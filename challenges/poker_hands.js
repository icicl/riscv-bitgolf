const title="Poker Hands";
const url="poker_hands";
const summary="In a deck with <b>n</b> suits, each with thirteen cards, how many hands are there that are worth nothing?";
const details="A hand is worth nothing if it contains no two cards of the same rank (no pairs, three-of-a-kind, etc), is not a flush (all the same suit), and is not a straight (in poker Ace can be low or high)";
const constraints="<b>P(n)</b> < 2^32<br><b>n > 0</b>";
const difficulty=['Intermediate', 'gold', '#ff8'];
const input_type = "int";
const tests=[[[1], 0], [[2], 38310], [[3], 306480], [[4], 1302540], [[5], 3984240], [[6], 9922290], [[7], 21453600], [[8], 41834520], [[9], 75394080], [[10], 127687230], [[11], 205648080], [[12], 317743140], [[13], 474124560], [[14], 686783370], [[15], 969702720], [[16], 1339011120], [[17], 1813135680], [[18], 2412955350], [[19], 3161954160], [[20], 4086374460]];