<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RISC-V Bit-Golf - Change Password</title>
    <link rel="stylesheet" href="styles.css">

    <script>const errorcode = <?php
    session_start();

    require "util/sql_auth.php";
    if (!isset($_SESSION['username'])) {
        header("Location: login.php");
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['change_password'])) {
            if (isset($_SESSION['username'])) {
                $current_password = $_POST['current_password'];
                $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

                $sql = "SELECT password FROM users WHERE username=?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $_SESSION['username']);
                $stmt->execute();
                $stmt->store_result();
                $stmt->bind_result($hashed_password);
                $stmt->fetch();

                if ($stmt->num_rows > 0 && password_verify($current_password, $hashed_password)) {
                    $sql = "UPDATE users SET password=? WHERE username=?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ss", $new_password, $_SESSION['username']);

                    if ($stmt->execute()) {
                        echo 4; // password changed successfully
                    } else {
                        echo $stmt->errno;
                    }
                } else {
                    echo 99; // provided pwd incorrect
                }

                $stmt->close();
            } else {
                echo 88;
            }
        } else {
            echo 11;
        }
    } else {
        echo 0;
    }
    $conn->close();
    ?>;
        const ERROR_CODES = {
            0: '',
            4: 'Password changed successfully.',
            99: 'Provided password is incorrect.',
            88: 'Must be logged in to change password.'
        }</script>

</head>

<body>
    <div class="navbar">
        <div class="box-link" onclick="location.href = 'index.php'">Go to Index of all challenges
        </div>
        <?php
        if (isset($_GET["src"])) {
            echo '<div class="vertical-divider"></div><div class="box-link" onclick="location.href = \'' . urldecode($_GET["src"]) . '\'">Return to previous page</div>';
        }
        ?>
    </div>
    <div class="container">
        <div class="column">
            <div class="box">
                <h1>
                    Welcome to Bit-Golf.
                </h1>
                <h3>
                    Change your password here.
                </h3>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="column">
            <div class="box" id="status-box" style="flex:0 0 50px">
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="box-change-pwd">
                <h1>Change Password</h1>
                <form method="post" action="">
                    <input type="hidden" name="change_password" value="1">
                    <label for="current_password">Current Password:</label><br>
                    <input type="password" id="current_password" name="current_password"><br>
                    <label for="new_password">New Password:</label><br>
                    <div id="password-error" style="color:red"></div><br>
                    <input type="password" id="new_password" name="new_password" oninput="check_password()"><br><br>
                    <input type="submit" value="Change Password">
                </form>
            </div>
            <div class="horizontal-divider"></div>
        </div>
    </div>
    <script>
        if (errorcode !== 0) {
            const infobox = document.getElementById("status-box");
            if (errorcode in ERROR_CODES) {
                infobox.innerHTML = ERROR_CODES[errorcode];
            } else {
                infobox.innerHTML = "Unknown status code: " + errorcode;
            }
        }
        function check_password() {
            const pwd = document.getElementById("new_password").value;
            const errdiv = document.getElementById("password-error");
            errdiv.innerHTML = "";
            if (pwd.length > 0) {
                if (pwd.length < 8) {
                    errdiv.innerHTML += "<div>It is recommended that your password be at least 8 characters.</div>";
                }
                if (!/([a-z])/.test(pwd)) {
                    errdiv.innerHTML += "<div>It is recommended that your password contain a lowercase  letter.</div>";
                }
                if (!/([A-Z])/.test(pwd)) {
                    errdiv.innerHTML += "<div>It is recommended that your password contain an uppercase letter.</div>";
                }
                if (!/([0-9])/.test(pwd)) {
                    errdiv.innerHTML += "<div>It is recommended that your password contain a number.</div>";
                }
                if (!/([^A-Za-z0-9])/.test(pwd)) {
                    errdiv.innerHTML += "<div>It is recommended that your password contain a special character.</div>";
                }

            }
        }
    </script>
</body>

</html>