<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RISC-V Bit-Golf Login</title>
    <link rel="stylesheet" href="styles.css">

    <script>const errorcode = <?php
    session_start();

    require "util/sql_auth.php";


    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['register'])) {
            $username = $_POST['username'];
            $username = preg_replace("/[^A-Za-z0-9_]/", "", $username);
            if (strlen($username) < 3 || strlen($username) > 16) {
                echo 7;//bad username
            } else {
                $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

                $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ss", $username, $password);

                if ($stmt->execute()) {
                    $_SESSION["username"] = $username;
                    echo 10; // Successful account creation
                    if (isset($_GET["src"])) {
                        header("Location: " . urldecode($_GET["src"]));
                    } else {
                        header("Location: index.php");
                    }
                    } else {
                    echo $stmt->errno;//1062: duplicate
                }
                $stmt->close();
            }
        } elseif (isset($_POST['login'])) {
            $username = $_POST['username'];
            $username = preg_replace("/[^A-Za-z0-9_]/", "", $username);
            $password = $_POST['password'];

            $sql = "SELECT password FROM users WHERE username=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($hashed_password);
            $stmt->fetch();

            if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
                $_SESSION["username"] = $username;
                $sql = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE username = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $username);

                if ($stmt->execute()) {
                    echo 1; // Successful login
                } else {
                    echo 9; // failed to update logintime
                }
                if (isset($_GET["src"])) {
                    header("Location: " . urldecode($_GET["src"]));
                } else {
                    header("Location: index.php");
                }
            } else {
                echo 3; // Bad login attempt
            }

            $stmt->close();

        } elseif (isset($_POST['change_password'])) {
            if (isset($_SESSION['user_id'])) {
                $current_password = $_POST['current_password'];
                $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

                $sql = "SELECT password FROM users WHERE id=?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("i", $_SESSION['user_id']);
                $stmt->execute();
                $stmt->store_result();
                $stmt->bind_result($hashed_password);
                $stmt->fetch();

                if ($stmt->num_rows > 0 && password_verify($current_password, $hashed_password)) {
                    $sql = "UPDATE users SET password=? WHERE id=?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("si", $new_password, $_SESSION['user_id']);

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
                echo 88;//must be signed to change pwd
            }
        }
    } else {
        echo 0;
    }
    $conn->close();
    ?>;
        const ERROR_CODES = {
            0: '',
            7: 'Invalid Username. Must be 3-16 characters, and only letters, numbers, and underscores.',
            10: 'Successfully created account',
            1062: 'Username already exists.',
            1: 'Logged in successfully.',
            3: 'Incorrect username or password.',
        }</script>

</head>

<body>
    <div class="navbar">
        <div class="box-link" onclick="location.href = 'index.php'">Go to Index of all challenges
        </div>
    </div>
    <div class="container">
        <div class="column">
            <div class="box">
                <h1>
                    Welcome to Bit-Golf.
                </h1>
                <h3>
                    Create an account if you're new here, or sign in to your existing account.
                </h3>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="column">

            <div class="box" id="box-register">
                <h1>Create Account</h1>
                <div id="register-error" style="color:red"></div><br>
                <form method="post" action="">
                    <input type="hidden" name="register" value="1">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username-register" name="username" oninput="check_username()"><br>
                    <div id="username-error" style="color:red"></div><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password-register" name="password" oninput="check_password()"><br><br>
                    <div id="password-error" style="color:red"></div><br>
                    <input type="submit" value="Create Account">
                </form>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" id="box-login">
                <h1>Login</h1>
                <div id="login-error" style="color:red"></div><br>
                <form method="post" action="">
                    <input type="hidden" name="login" value="1">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username-login" name="username"><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password-login" name="password"><br><br>
                    <input type="submit" value="Login">
                </form>
            </div>
        </div>
    </div>
    <script>
        if (errorcode !== 0) {
            if (errorcode === 7) {
                document.getElementById('register-error').innerHTML = "Invalid username received.";
            } else if (errorcode === 1062) {
                document.getElementById('register-error').innerHTML = "Username already exists.";
            } else if (errorcode === 3) {
                document.getElementById('login-error').innerHTML = "Invalid username or password.";
            } else {
                document.getElementById('register-error').innerHTML = "Unknown error: " + errorcode;
            }
        }
        function check_username() {
            const uname = document.getElementById("username-register").value;
            const errdiv = document.getElementById("username-error");
            if (!/^[A-Za-z0-9_]{3,16}$/.test(uname)) {
                errdiv.innerHTML = "Username must be 3-16 characters, and may only contain letters, numbers, and underscore.<br>";
            } else {
                errdiv.innerHTML = "";
            }
        }
        function check_password() {
            const pwd = document.getElementById("password-register").value;
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