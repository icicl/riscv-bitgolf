const title="Simple Regex";
const url="simple_regex";
const summary="Given a string and a regex, determine if the string matches the regex.";
const details="The regex must match the entire string, not just a substring.";
const constraints="The string will only contain upper- and lower-case letters and numbers. The regex will contain these, as well as <b>.</b>, <b>?</b>, <b>+</b>, <b>*</b>";
const difficulty=['Advanced', 'red'];
const input_type = "int";
const tests=[[['', '.?'], 1], [['', '.*'], 1], [['', '.+'], 0], [['sand', 'san.*.*'], 1], [['aaaaaab', 'a*'], 1], [['salami', 'sa?a?a?l.*', 1]], [['sand', 'san.+.+'], 0]];