<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RISC-V Bit-Golf</title>
    <link rel="stylesheet" href="styles.css">
    <script src="challenges_index.js">
    </script>
    <script>
        <?php session_start();
        require("util/sql_auth.php");
        if (isset($_GET['u'])) {
            $user = $_GET['u'];
            $user = preg_replace("/[^A-Za-z0-9_]/", "", subject: $user);
        } elseif (isset($_SESSION['username'])) {
            $user = $_SESSION["username"];
        } else {
            header("Location: index.php");
            die();
        }


        $sql = "SELECT challenge FROM challenge_scores WHERE username = '$user';";
        $result = $conn->query($sql);
        if ($result instanceof mysqli_result) {
            echo 'const COMPLETED = [';
            while ($row = $result->fetch_assoc()) {
                echo "'" . $row["challenge"] . "', ";
            }
            echo ']';
            $result->free();
        } else {
            echo "Error: " . $conn->error;
        }

        $sql = "SELECT account_created, last_login FROM users WHERE username = '$user';";
        $result = $conn->query($sql);
        if ($result instanceof mysqli_result) {
            if ($result->num_rows == 1) {
                $row = $result->fetch_assoc();
                echo "\n        const ACCOUNT_INIT = '" . $row['account_created'] . "';";
                echo "\n        const LAST_LOGIN = '" . $row['last_login'] . "';\n";
            } else {
                header("Location: index.php");
                die();
                }
            $result->free();
        } else {
            echo "Error: " . $conn->error;
        }

        $conn->close();

        ?>
    </script>
</head>

<body>
    <?php
    require("util/navbar.php");

    ?>
    <div class="container" style='flex:0 0 min-content'>
        <div class="column">
            <div class="box">
                <h1><?php echo $user;?></h1>
                <?php echo "Account created on " . $row['account_created'] . "; " . (new DateTime())->diff(new DateTime($row['account_created']))->days . " days ago.<br>";
                echo "Last login done on " . $row['last_login'] . "; " . (new DateTime())->diff(new DateTime($row['last_login']))->days . " days ago.";
                 ?>
            </div>
        </div>
    </div>
    <div class="horizontal-divider"></div>
    <div class="container" style='flex:0 0 min-content' id="progress">

    </div>
    <script>
        function add_hdiv(el) {
            hdiv = document.createElement('div');
            hdiv.classList.add('horizontal-divider');
            el.appendChild(hdiv);
        }
            completion_rate = [null, null, null, null, null] // [name, colors, [done], [remaining]]
            challenges.forEach((challenge) => {
                diff = challenge[5];
                if (completion_rate[diff] === null) {
                    completion_rate[diff] = [challenge[2], [challenge[3], challenge[4]], [], []];
                }
                if (COMPLETED.includes(challenge[1])) {
                    completion_rate[diff][2].push([challenge[0], challenge[1]]);
                } else {
                    completion_rate[diff][3].push([challenge[0], challenge[1]]);
                }
            });
            progress_div = document.getElementById("progress");
            for (i=0; i<5; i++) {
                rate = completion_rate[i][2].length / (completion_rate[i][2].length + completion_rate[i][3].length)
                newdiv = document.createElement('div');
                newdiv.classList.add('box');
                newdiv.innerHTML = '<h1>' + completion_rate[i][0] + '</h1>';
                progress_div.appendChild(newdiv);
                if (i < 4) {
                    vdiv = document.createElement('div');
                    vdiv.classList.add('vertical-divider');
                    progress_div.appendChild(vdiv);
                }
                subdiv = document.createElement('div');
                subdiv.classList.add("progress-wheel"); 
                subdiv.style.background = `radial-gradient(closest-side, white 84%, transparent 85% 100%, white 0), conic-gradient(${completion_rate[i][1][0]} ${rate*100}%, ${completion_rate[i][1][1]} 0%)`
                subdiv.style.display = "flex";
                subdiv.innerHTML = "<div style='display:flex;justify-content:center;align-items: center;'>" + completion_rate[i][2].length + " of " + (completion_rate[i][2].length + completion_rate[i][3].length) + "</div>";
                newdiv.appendChild(subdiv);
                add_hdiv(newdiv);

                if (completion_rate[i][2].length !== 0) {
                    subdiv = document.createElement('div'); 
                    subdiv.innerHTML = "<b class='white'>Finished</b>";
                    completion_rate[i][2].forEach((challenge) => {
                        subdiv.innerHTML += "<div class='outline-on-hover' onclick=\"location.href='challenge.php?x=" +
                        challenge[1] + "'\">> " + challenge[0] + "</div>"
                    });
                    newdiv.appendChild(subdiv);
                    add_hdiv(newdiv);
                }

                if (completion_rate[i][3].length !== 0) {
                    subdiv = document.createElement('div');
                    subdiv.innerHTML = "<b class='white'>Remaining</b>";
                    completion_rate[i][3].forEach((challenge) => {
                        subdiv.innerHTML += "<div class='outline-on-hover' onclick=\"location.href='challenge.php?x=" +
                        challenge[1] + "'\">> " + challenge[0] + "</div>"
                    });
                    newdiv.appendChild(subdiv);
                }
        }

    </script>

</body>

</html>