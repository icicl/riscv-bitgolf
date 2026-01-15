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
require ("util/navbar.php"); ?>
    <div class="container">
    <div class="column">
            <div class="box">
                <div>
                    <h1>Getting started</h1>The Bit-Golf game on this site uses the base RV32I instruction set - which
                    means
                    no builtin multiplication or division or floating point arithmetic, etc. There are two special
                    system
                    call functions: <b>INPUT</b> and <b>OUTPUT</b>. <b>INPUT RD</b> takes the next value from the input queue and writes it
                    to
                    register <b>RD</b>. If the input queue is empty, -1 is written. <b>OUTPUT RS</b> halts execution, returning the
                    value
                    contained in <b>RS</b>.<br><br>
                    <div onclick="location.href='isa.php'">
                        <b>> See the supported instruction set and VM features here < </b>
                    </div><br><br>One way to get started is to write your code in C, and compile it to RISC-V using <a
                        href="https://godbolt.org">GodBolt</a>. I recommend using the -O2 flag. Be aware that the RISC-V VM only
                    supports memory access
                    from 0x00000000 to 0x000FFFFF - this is especially important if you don't use -O2, as the stack
                    pointer
                    will underflow.
                </div>
            </div>
        </div>
        <div class="vertical-divider"></div>

        <div class="column" id="sample"></div>

        <script>
            const scores = {};
            <?php require "util/sql_auth.php";
            $sql = "SELECT challenge, score 
                    FROM challenge_scores 
                    WHERE username = '" . ($_SESSION["username"] ?? "") . "';";
            $result = $conn->query($sql);

            while ($row = $result->fetch_array()) {
                echo "scores['" . $row[0] . "'] = " . $row[1] . ";\n";
            }
            ;

            ?>
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'sample.html', true);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return;
                document.getElementById('sample').innerHTML = this.responseText;
            }
            xhr.send();
        </script>
</body>

</html>