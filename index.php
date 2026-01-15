<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RISC-V Bit-Golf</title>
    <link rel="stylesheet" href="styles.css">
    <script src="challenges_index.js">
    </script>
</head>

<body><?php session_start();
require("util/navbar.php"); ?>
    <div class="container">
        <div class="column">
            <div class="box" style="flex:0 min-content">
                <h2>What is RISC-V Bit-Golf?</h2>
                <div>
                    Bit-Golf is a form of <a href="https://en.wikipedia.org/wiki/Code_golf">code golf</a> where the goal
                    is to minimize the number of <b>'1'</b> bits in the machine code representation of a program. This
                    site uses the RISC-V RV32I instruction set.
                </div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" style="flex:0 min-content">
                <h2>The Virtual Machine</h2>
                The RISC-V VM has 4KiB of instruction memory, which cannot be accessed, and 1024KiB of little-endian
                data memory, which is mapped from 0x00000000 to 0x000FFFFF.
                The VM has support for all RV32I instructions and pseudoinstructions listed on this page.
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" style="flex:1 0px">
                <h2>The Editor / Assembler</h2>
                <div>
                    The Assembler has the following features:<br><br><br>
                    Single-line comments: use <b>;</b> to begin a single-line comment. Any text after and including the
                    <b>;</b> will be ignored.<br><br>
                    Breakpoints: use a right carat <b>></b> before an instruction to set a breakpoint.<br><br>
                    Labels: use a series of non-whitespace text followed by a colon <b>:</b> to create a label. Labels
                    can be used instead of immediates in jump and branch instructions. Labels cannot start with a
                    number.<br><br>
                    Step: use <b>[ctrl]+,</b> to execute one instruction at a time.<br><br>
                    Run until breakpoint: use <b>[ctrl]+.</b> to execute until the next breakpoint is reached.<br><br>
                    Execute: use <b>[ctrl]+/</b> to run the program until it exits or times out.<br><br>
                    Smart indentation: <b>[tab]</b> and <b>[backspace]</b> will automatically align whitespace to
                    multiples of four characters. The commands <b>[ctrl]+]</b> and <b>[ctrl]+[</b> allow you to indent
                    or dedent multiple lines at once.
                </div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box">
                <div>
                    <h2>Getting started</h2>The Bit-Golf game on this site uses the base RV32I instruction set - which
                    means
                    no builtin multiplication or division or floating point arithmetic, etc. There are two special
                    system
                    call functions: INPUT and OUTPUT. INPUT RD takes the next value from the input queue and writes it
                    to
                    register RD. If the input queue is empty, -1 is written. OUTPUT RS halts execution, returning the
                    value
                    contained in RS.<br><br>
                    <div onclick="location.href='isa.php'">
                        <b>> See the supported instruction set and VM features here < </b>
                    </div><br><br>One way to get started is to write your code in C, and compile it to RISC-V using <a
                        href="https://godbolt.org">GodBolt</a>. I recommend using the -O2 flag. Be aware that the RISC-V
                    VM only
                    supports memory access
                    from 0x00000000 to 0x000FFFFF - this is especially important if you don't use -O2, as the stack
                    pointer
                    will underflow.
                </div>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="column">
            <div style='flex:0 0 min-content' class="box">
                <h2>Play:</h2>
            </div>
            <div class="horizontal-divider"></div>
            <div style="overflow-y:scroll" id="challenges"></div>
        </div>

        <script>
            const scores = {};
            <?php require "util/sql_auth.php";
            $isa = $_SESSION['isa'] ?? 'RV32I';
            $sql = "SELECT challenge, score 
                    FROM challenge_scores 
                    WHERE username = '" . ($_SESSION["username"] ?? "") . "'
                    AND isa = '$isa';";
            $result = $conn->query($sql);

            while ($row = $result->fetch_array()) {
                echo "scores['" . $row[0] . "'] = " . $row[1] . ";\n";
            }
            ;

            ?>
            const ISA_EXTENSIONS = [<?php if (isset($_GET["i"])) {
                if (str_contains(strtoupper($_GET['i']), 'M'))
                    echo "'M', ";
            } ?>];
            const challengediv = document.getElementById("challenges");
            challenges.forEach((challenge) => {
                challengediv.innerHTML += "<div style='padding-top:0px;padding-bottom:0px;flex:0 0 min-content;flex-direction:row' class='box-link' onclick=\"location.href='challenge.php?x=" +
                    challenge[1] + "'\"><h3>> " + challenge[0] + " -&nbsp;</h3>" +
                    "<div style='border-radius:5px;padding:3px;color:white;background-color:" + challenge[3] + ";justify-content:center;margin:auto'>" + challenge[2] + "</div>" + "<div style='flex:1;text-align:right;justify-content: center;margin:auto'><span>" + (challenge[1] in scores ? "" + scores[challenge[1]] + " bits" : "no submission") + "<span></div></div><div class=horizontal-divider></div>"
            });
            challengediv.innerHTML += "<div style='flex:1' class='box'>More challenges coming soon...<br><br>Suggestions are welcome.</div>";
        </script>
</body>

</html>