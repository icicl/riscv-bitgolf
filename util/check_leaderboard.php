<?php
    require "../util/sql_auth.php";

if (!isset($_GET['x'])) {
    die();
}
$challenge = $conn->real_escape_string($_GET['x']); // assuming challenge is passed as a GET parameter
$isa = "RV32I";
if (isset($_GET['i'])) {
    if (str_contains(strtoupper($_GET['i']), 'M')) $isa .= 'M';
}
$sql = "SELECT username, score 
        FROM challenge_scores 
        WHERE challenge = '$challenge' 
        AND isa = '$isa'
        ORDER BY score ASC 
        LIMIT 10";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    echo "[[";
    while ($row = $result->fetch_assoc()) {
        echo "[\"" . $row["username"] . "\"," . $row["score"] . "],";
    }
    echo "],";
} else {
    echo "[[],";
}

session_start();
if (isset($_SESSION["username"])) {
    $user = $conn->real_escape_string($_SESSION['username']); // assuming username is passed as a GET parameter


    // Find the score of the user for the given challenge
    $sql = "SELECT score 
        FROM challenge_scores 
        WHERE username = '$user' AND challenge = '$challenge' AND isa = '$isa'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $user_score = $row['score'];

        // Find the rank of the user
        $sql_rank = "SELECT COUNT(*) + 1 AS amount
         FROM challenge_scores
         WHERE challenge = '$challenge' AND isa = '$isa' AND score < $user_score";

        $result_rank = $conn->query($sql_rank);

        if ($result_rank->num_rows > 0) {
            $row_rank = $result_rank->fetch_assoc();
            echo $row_rank['amount'] . "," . $user_score;
        } else {
            echo "-2,0";
        }
    } else {
        echo "-1,0";
    }
} else {
    echo "-3,0";
}
echo "]";

$conn->close();
?>