<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Play RISC-V Bit-Golf</title>
    <link rel="stylesheet" href="styles.css">
    <script src="challenges/<?php
    session_start();
    if (!isset($_GET['x']) || !preg_match("/^[A-Za-z_]+$/", $_GET['x']) || !file_exists("challenges/" . $_GET['x'] . ".js")) {
        header("Location: index.php");
        die();
    }
    echo $_GET['x'];
    ?>.js"></script>
</head>

<body>
    <?php require("util/navbar.php"); ?>
    <div class="container">
        <div class="column">
            <div class="box" id="box-nw" style="flex:0 0 360px">
                <div id="title-header" style="display:flex;flex-direction:row">
                </div>
                <div id="task-summary" onclick="toggleExpandTask()">
                </div>
                <div id="task-full" onclick="toggleExpandTask()" style="display: none;">
                </div>
                <table id="testcaseTable">
                    <thead>
                        <tr>
                            <th>Active</th>
                            <th>Testcase #</th>
                            <th>Input</th>
                            <th>Expected Output</th>
                            <th>Actual Output</th>
                        </tr>
                    </thead>
                    <tbody id="testTableBody">
                    </tbody>
                </table>
                <br>
                Click a testcase to select it. The input from that testcase will be used in the simulator. There is one
                custom testcase to allow you to load your own input for debugging. This testcase is not considered when
                submitting.
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="box-w" style="flex:0 0 40px">
                <div id="bitcount"></div>
                <div id="bitcount_avg"></div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="box-sw" style="flex:0 0 150px">
                <div id="validation-box-loading" style="display:none">
                    Processing submission...
                </div>
                <div id="validation-box-results">
                    <div>
                        To submit to the server use <b>[ctrl]+[enter]</b>. You are limited to 1 submission per minute,
                        and
                        10 per hour (sitewide). Each testcase is limited to 2^24 RISC-V CPU cycles.<br><br>
                    </div>
                    <table id="servertestresulttable" style="display:none">
                        <thead>
                            <tr>
                                <th>Tests</th>
                                <th>Passed</th>
                                <th>Failed</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="box-ssw" style="flex:0 0 100%">
                <div id="leaderboard-box-all-users">
                    <table id="leaderboardtable">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>User</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    Click an entry to load the code into your editor. You must have the same or better score as a
                    submission to view it. ctrl-click an entry to view that user's submission history.
                </div>
                <div id="leaderboard-box-user-history" style="display:none">
                    <div id="leaderboard-user-history-name"></div>
                    <table id="userhistorytable">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div
                        onclick="document.getElementById('leaderboard-box-all-users').style.display = 'block';document.getElementById('leaderboard-box-user-history').style.display = 'none';">
                        Click to return to main leaderboard ↩
                    </div>
                </div>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="column">
            <div class="box" id="box-n">
                <h1>RISC-V Instruction Encoder</h1>
                <div id="description-summary" onclick="toggleExpand()">
                    Supports RV32I. 1MiB DMEM (little endian), 4KiB IMEM. <b>;</b> for single-line comments. <b>></b>
                    to set a breakpoint. <b>*:</b> For labels. Click for more details.<br><br>
                </div>
                <div id="description-full" onclick="toggleExpand()" style="display: none;">This is a 32-bit RISC-V
                    simulator.
                    Only
                    RV32I instructions are supported (which means no built-in multiplication
                    or division).<br><br>
                    There is 1MiB of data memory - from addresses 0x0000_0000 to 0x000F_FFFF. This memory is little
                    endian, and
                    non-aligned accesses are supported.<br>
                    The instruction memory is 4KiB (1024 instructions), starting at address 0x0000_0000.<br><br>
                    <div id="cycle-limit">
                        <div id="cycle-brief" onclick="toggleCycleView()">
                            Execution is limited to <span id="client-cycle-limit-spanner">65536</span> CPU cycles (click
                            here to change client side limit).</div>
                        <div id="cycle-select" style="display: none;" onclick="toggleCycleView()">
                            Select limit for CPU cycles during execution.
                            <div class="box-link" style="flex-direction:row;padding:0px"
                                onclick="set_cycle_limit(1<<16)">
                                <div style="flex:1">2^16 (65536)</div>
                                <div class="right-align">Fastest. Default.</div>
                            </div>
                            <div class="box-link" style="flex-direction:row;padding:0px"
                                onclick="set_cycle_limit(1<<18)">
                                <div style="flex:1">2^18 (262144)</div>
                                <div class="right-align">Fast.</div>
                            </div>
                            <div class="box-link" style="flex-direction:row;padding:0px"
                                onclick="set_cycle_limit(1<<20)">
                                <div style="flex:1">2^20 (1048576)</div>
                                <div class="right-align">Moderate</div>
                            </div>
                            <div class="box-link" style="flex-direction:row;padding:0px"
                                onclick="set_cycle_limit(1<<22)">
                                <div style="flex:1">2^22 (4194304)</div>
                                <div class="right-align">Moderate.</div>
                            </div>
                            <div class="box-link" style="flex-direction:row;padding:0px"
                                onclick="set_cycle_limit(1<<24)">
                                <div style="flex:1">2^24 (16777216)</div>
                                <div class="right-align">Slow. Used during validation.</div>
                            </div>
                            <div class="box-link" style="flex-direction:row;padding:0px"
                                onclick="set_cycle_limit(1<<26)">
                                <div style="flex:1">2^26 (67108864) </div>
                                <div class="right-align">Slowest. Not recommended.</div>
                            </div>
                        </div>
                    </div><br>
                    Any text on a line following a semicolon (<b>;</b>) is treated as a comment. Currently only
                    single-line
                    comments are supported.<br>
                    To set a breakpoint, use the right carat (<b>></b>) at the beginning of a line before the
                    instruction.<br>
                    To make a label, enter any text followed by a colon <b>:</b> You can use the label as a
                    reference in
                    branch and jump instructions and the corresponding relative address will be calculated for
                    you.<br><br>
                    Enter one instruction per line. The instructions will appear below the textbox, alongside their
                    machine code
                    representation. If the program is
                    still running, the instruction that will be executed next is highlighted green.<br>
                    To execute a single instruction, press <b>[ctrl]+,</b><br>
                    To run until the next breakpoint, press <b>[ctrl]+.</b> This will execute until the PC reaches
                    an
                    instruction where a breakpoint exists.
                    Execution pauses just before the chosen instruction is run.<br>
                    To execute the program until it finishes (or errors), press <b>[ctrl]+/</b><br><br>
                    Click to hide details.<br><br>
                </div>
                <div class="execute-button-container">
                    <div class="execute-button" onclick="runsingle()">Execute single instruction</div>
                    <div class="execute-button" onclick="runbreakpoint()">Execute until breakpoint</div>
                    <div class="execute-button" onclick="runhalt()">Execute until halt</div>
                </div>
                <textarea autocomplete="off" autocorrect="off" spellcheck="false" id="instructions"
                    oninput="encodeInstructions()" class="full-width"></textarea>

            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="s">
                <table id="instructionTable">
                    <thead>
                        <tr>
                            <th>BP</th>
                            <th>Line</th>
                            <th>RISC-V Assembly</th>
                            <th class="right-align">RISC-V Machine Code</th>
                            <th class="right-align">Number of '1' Bits</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="column">
            <div class="box" id="box-ne">
                <h1>Memory Viewer</h1>
                <div class="table-container">
                    <div style="margin-bottom:10px">
                        Choose page in memory to view.<br>
                        <input id="mem_page_selector" value="000" oninput="update_mem_viewer()">
                    </div>
                    <div id="mem_viewer_active_page">
                    </div>
                    <table id="memorytable" style="width:0px">
                        <thead>
                            <tr>
                                <th>ROW</th>
                                <th>_0</th>
                                <th>_1</th>
                                <th>_2</th>
                                <th>_3</th>
                                <th>_4</th>
                                <th>_5</th>
                                <th>_6</th>
                                <th>_7</th>
                                <th>_8</th>
                                <th>_9</th>
                                <th>_A</th>
                                <th>_B</th>
                                <th>_C</th>
                                <th>_D</th>
                                <th>_E</th>
                                <th>_F</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div style="margin-bottom:10px"></div>
                    <table id="memorytablelegend" style="height:0px">
                        <thead>
                            <tr>
                                <th style="width:33%;background-color:#ddf">Read</th>
                                <th style="width:33%;background-color:#ffd">Written</th>
                                <th style="width:33%;background:repeating-linear-gradient(45deg, #ddf, #ddf 4px, #ffd 4px, #ffd 8px)">Read and Written</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="box-e">
                <h1>Register Values</h1>
                <div class="table-container">
                    <table id="infoTable">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Hexadecimal</th>
                                <th>Binary</th>
                                <th>Decimal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br>
                    <table id="registerTable">
                        <thead>
                            <tr>
                                <th>Register</th>
                                <th>Hexadecimal</th>
                                <th>Binary</th>
                                <th>Decimal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script>
        document.querySelectorAll('.vertical-divider').forEach(divider => {
            divider.addEventListener('mousedown', function (e) {
                e.preventDefault();
                const startX = e.clientX;
                const prevCol = divider.previousElementSibling;
                const prevWidth = prevCol.getBoundingClientRect().width;

                function onMouseMove(e) {
                    const delta = e.clientX - startX;
                    if (prevWidth + delta > 0) {
                        prevCol.style.flex = `0 0 ${prevWidth + delta}px`;
                    }
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });

        document.querySelectorAll('.horizontal-divider').forEach(divider => {
            divider.addEventListener('mousedown', function (e) {
                e.preventDefault();
                const startY = e.clientY;
                const prevBox = divider.previousElementSibling;
                const prevHeight = prevBox.getBoundingClientRect().height;

                function onMouseMove(e) {
                    const delta = e.clientY - startY;
                    if (prevHeight + delta > 0) {
                        prevBox.style.flex = `0 0 ${prevHeight + delta}px`;
                    }
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });

        const ISA_EXTENSIONS = "<?php echo substr($_SESSION['isa'] ?? 'RV32I', 5); ?>";

</script>
    <script src="cpu.js"></script>
    <script src="test.js"></script>
    <script src="script.js"></script>
    <script>
        let score=0;

        document.getElementById('title-header').innerHTML = `<h1 style="flex:1">Bit-Golf: ${title}</h1>` + "<div style='flex:0 min-width;border-radius:5px;padding:3px;color:white;background-color:" + difficulty[1] + ";justify-content:center;margin:auto'>" + difficulty[0] + "</div>";
        document.getElementById('task-summary').innerHTML = summary + "<br><br>Click to expand.<br><br>";
        document.getElementById('task-full').innerHTML = summary + "<br><br>" + details + "<br><br>Constraints:<br>" + constraints + "<br><br>Click to hide.<br><br>";


        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.key === ',') {
                event.preventDefault();
                runsingle();
            }
            if (event.ctrlKey && event.key === '.') {
                event.preventDefault();
                runbreakpoint();
            }
            if (event.ctrlKey && event.key === '/') {
                event.preventDefault();
                runhalt();
            }
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                postSubmit();
            }
        });
        document.getElementById("instructions").addEventListener('keydown', function (e) {
            const TABSIZE = 4;
            var start = this.selectionStart;
            var end = this.selectionEnd;
            if (e.key === 'Tab') {
                var value = this.value;
                var selection = this.value.substring(start, end);
                e.preventDefault();
                if (/\n/.test(selection)) {
                    var replacement_text = "";
                    selection.split("\n").forEach((line) => {
                        i = 0;
                        while (i < line.length && line[i] === ' ') {
                            i++;
                        }
                        replacement_text += '    '.substring(0, i === line.length ? 0 : 4 - i % TABSIZE) + line + '\n';
                    });
                    this.setRangeText(replacement_text.substring(0, replacement_text.length - 1), start, end, 'preserve');
                } else {
                    var linestart = start;
                    while (linestart > 0 && value[linestart] !== '\n') {
                        linestart--;
                    }
                    linestart++;
                    num_spaces = TABSIZE - (start - linestart) % TABSIZE;
                    this.setRangeText("    ".substring(0, num_spaces), start, end, 'end');
                }
                encodeInstructions();
            }
            if (e.key == 'Backspace') {
                if (start === end && this.value[start - 1] === ' ') {
                    e.preventDefault();
                    var value = this.value;
                    var linestart = start - 1;
                    while (linestart > 0 && value[linestart] !== '\n') {
                        linestart--;
                    }
                    linestart++;
                    backspace_size = 1;
                    while (value[start - backspace_size - 1] == ' ' && (start - backspace_size - linestart) % TABSIZE !== 0) {
                        backspace_size++;
                    }
                    this.setRangeText('', start - backspace_size, end);
                }
                encodeInstructions();
            }
            if (e.key == ']' && e.ctrlKey) {
                var value = this.value;
                var aligned_start = start;
                while (aligned_start > 0 && value[aligned_start - 1] !== '\n') {
                    aligned_start--;
                }
                var aligned_end = end;
                if (start === end || value[aligned_end - 1] !== '\n') {
                    while (value[aligned_end] === ' ') {
                        aligned_end++;
                    }
                }
                var selection = this.value.substring(aligned_start, aligned_end);
                var replacement_text = "";
                selection.split("\n").forEach((line) => {
                    i = 0;
                    while (i < line.length && line[i] === ' ') {
                        i++;
                    }
                    console.log(i, line.length);
                    replacement_text += '    '.substring(0, (line.length !== 0) ? 4 - i % TABSIZE : 0) + line + '\n';
                });
                this.setRangeText(replacement_text.substring(0, replacement_text.length - 1), aligned_start, aligned_end, 'preserve');
                encodeInstructions();
            }
            if (e.key == '[' && e.ctrlKey) {
                var value = this.value;
                var aligned_start = start;
                while (aligned_start > 0 && value[aligned_start - 1] !== '\n') {
                    aligned_start--;
                }
                var aligned_end = end;
                if (start === end || value[aligned_end - 1] !== '\n') {
                    while (value[aligned_end] === ' ') {
                        aligned_end++;
                    }
                }
                var selection = this.value.substring(aligned_start, aligned_end);
                var replacement_text = "";
                selection.split("\n").forEach((line) => {
                    i = 0;
                    while (i < line.length && line[i] === ' ') {
                        i++;
                    }
                    replacement_text += line.substring((i - 1) % TABSIZE + 1) + '\n';
                });
                this.setRangeText(replacement_text.substring(0, replacement_text.length - 1), aligned_start, aligned_end, 'preserve');
                encodeInstructions();
            }
        });
        function toggleExpand() {
            const div = document.getElementById('description-summary');
            const div2 = document.getElementById('description-full');
            if (div.style.display === "none") {
                div.style.display = "block";
                div2.style.display = "none";
            } else {
                div.style.display = "none";
                div2.style.display = "block";
            }
        }
        function toggleExpandTask() {
            const div = document.getElementById('task-summary');
            const div2 = document.getElementById('task-full');
            if (div.style.display === "none") {
                div.style.display = "block";
                div2.style.display = "none";
            } else {
                div.style.display = "none";
                div2.style.display = "block";
            }
        }
        function toggleCycleView() {
            toggleExpand();
            const div = document.getElementById('cycle-brief');
            const div2 = document.getElementById('cycle-select');
            if (div.style.display === "none") {
                div.style.display = "block";
                div2.style.display = "none";
            } else {
                div.style.display = "none";
                div2.style.display = "block";
            }
        }
        function set_cycle_limit(val) {
            CYCLE_LIMIT = val;
            document.getElementById("client-cycle-limit-spanner").innerHTML = val;
            localStorage["cycle_limit"] = val;
            encodeInstructions();
        }
        document.getElementById("testTableBody").addEventListener("click", testsClicked)
        function testsClicked(e) {
            active_test = e.srcElement.parentNode.number;
            localStorage["activetest_" + url] = active_test;
            if (active_test !== tests.length) {
                encodeInstructions();
            }
        }

        function postSubmit() {
            const loaddiv = document.getElementById("validation-box-loading");
            const resdiv = document.getElementById("validation-box-results");
            loaddiv.innerHTML = "Processing submission...";
            resdiv.style.display = "none";
            loaddiv.style.display = "block";
            if (document.getElementById('instructions').value.length >= 65536) {
                loaddiv.innerHTML = "Your code is too large to submit. Max 64KiB.";
                return;
            }
            if (USERNAME == "") {
                loaddiv.innerHTML = "You must create an account to submit to the leaderboard.";
                setTimeout(function () {
                    resdiv.style.display = "block";
                    loaddiv.style.display = "none";
                }, 1000);
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'util/verify.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const table = document.getElementById("servertestresulttable").querySelector('tbody')
                    table.parentElement.style.display = 'table';
                    const response = xhr.responseText.split(' ');
                    if (response.length == 5) {
                        table.innerHTML = '';
                        let newRow = table.insertRow();
                        newRow.innerHTML = `
                            <td>Public</td>
                            <td class="right-align">${response[0]}</td>
                            <td class="right-align">${response[1] - response[0]}</td>`;
                        newRow.style.backgroundColor = response[1] == response[0] ? 'RGB(200,255,200)' : `RGB(255,${255 * response[0] / response[1]},${255 * response[0] / response[1]}`;
                        newRow = table.insertRow();
                        newRow.innerHTML = `
                            <td>Hidden</td>
                            <td class="right-align">${response[2]}</td>
                            <td class="right-align">${response[3] - response[2]}</td>`;
                        newRow.style.backgroundColor = response[3] == response[2] ? 'RGB(200,255,200)' : `RGB(255,${255 * response[2] / response[3]},${255 * response[2] / response[3]}`;
                        resdiv.style.display = "block";
                        loaddiv.style.display = "none";
                        getLeaderboard();
                    } else if (response.length == 1) {
                        loaddiv.innerHTML = "You have submitted too recently. Wait " + response + " seconds to submit again.";
                        setTimeout(function () {
                            resdiv.style.display = "block";
                            loaddiv.style.display = "none";
                        }, 2500);
                        return;
                    }
                }
            };

            xhr.send('challenge=' + url + '&instructions=' + encodeURIComponent(document.getElementById('instructions').value) + (ISA_EXTENSIONS ? "&i=" + ISA_EXTENSIONS.toLowerCase() : ""));
        }

        function getLeaderboard() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'util/check_leaderboard.php?x=' + url + (ISA_EXTENSIONS ? "&i=" + ISA_EXTENSIONS.toLowerCase() : ""), true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText.replace(",]", "]"));
                    const table = document.getElementById("leaderboardtable").querySelector('tbody')
                    table.innerHTML = '';
                    rank = 0;
                    prev = 0;
                    selfranked = USERNAME === "";
                    if (response[1] > 0) {
                        score = response[2];
                    }
                    response[0].forEach((pair, idx) => {
                        if (pair[1] !== prev) {
                            prev = pair[1];
                            rank = idx + 1;
                        }
                        let newRow = table.insertRow();
                        newRow.innerHTML = `
                            <td>${rank}</td>
                            <td class="right-align">${pair[0]}</td>
                            <td class="right-align">${pair[1]}</td>`;
                        if (pair[0] == USERNAME) {
                            newRow.style.color = "#44f";
                            selfranked = true;
                        }
//                        if (response[1] > 0 && pair[1] >= response[2]) {
                            newRow.classList.add("submission-link");
                            newRow.user = pair[0];
                            newRow.score = pair[1];
                            newRow.onclick = function (event) {
                                if (event.ctrlKey) {
                                    loadcodehistory(this.user, this.score);
                                } else {
                                    loadcode(this.user, this.score);
                                }
                            };
//                        }
                    });
                    if (!selfranked && response[1] > 0) {
                        if (response[1] >= 12) {
                            let newRow = table.insertRow();
                            newRow.innerHTML = `
                            <td>...</td>
                            <td class="right-align">...</td>
                            <td class="right-align">...</td>`;
                        }
                        let newRow = table.insertRow();
                        newRow.innerHTML = `
                            <td>${response[1]}</td>
                            <td class="right-align">${USERNAME}</td>
                            <td class="right-align">${response[2]}</td>`;
                        newRow.style.color = "#44f";
                    }
                }
            };

            xhr.send();
        }
        function loadcode(user, score_, fname = null) {
            if (score == 0 || score_ < score) {
                return;
            }
            console.log(user, score_, score, fname);
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'util/get_code.php?u=' + user + '&x=' + url + (fname === null ? "" : "&f=" + fname) + (ISA_EXTENSIONS ? "&i=" + ISA_EXTENSIONS.toLowerCase() : ""), true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById("instructions").value = xhr.responseText;
                    document.getElementById("instructions").focus();
                    encodeInstructions();
                }
            }
            xhr.send();
        }
        function loadcodehistory(user, score_) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'util/get_code_history.php?u=' + user + '&x=' + url + (ISA_EXTENSIONS ? "&i=" + ISA_EXTENSIONS.toLowerCase() : ""), true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    response = JSON.parse(xhr.responseText)
                    document.getElementById("leaderboard-user-history-name").innerHTML = "<h3>" + user + "'s submissions</h3>"
                    document.getElementById("leaderboard-box-all-users").style.display = "none";
                    document.getElementById("leaderboard-box-user-history").style.display = "block";
                    const table = document.getElementById("leaderboard-box-user-history").querySelector('tbody')
                    table.innerHTML = "";
                    response.forEach(filename => {
                        if (!(filename == "." || filename == "..")) {
                            [stime, sscore] = filename.split('_');
                            stime_str = new Date(stime * 1000).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }).replace(',', '').replaceAll('/', '-');
                            let newRow = table.insertRow();
                            newRow.innerHTML = `
                            <td class="right-align">${stime_str}</td>
                            <td class="right-align">${sscore}</td>`;
                            newRow.classList.add("submission-link");
                            newRow.fname = filename;
                            newRow.user = user;
                            newRow.score = score_;
                            newRow.onclick = function () {
                                loadcode(this.user, this.score, this.fname);
                            };
                        }
                    });

                }
            }
            xhr.send();
        }



        update_mem_viewer();
        getLeaderboard();

    </script>
</body>

</html>