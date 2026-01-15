<?php
session_start();
if (!isset($_SESSION["username"])) {
    die();
}
$user = $_SESSION["username"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["challenge"]) && isset($_POST["instructions"])) {
        $challenge = $_POST["challenge"];
        if (!preg_match("/^[a-z_]+$/", $challenge)) {
            die();
        }
        $s = $_POST["instructions"];
        if (strlen($s) > 65536) {
            echo "Code file is too large (max 64KiB)";
            die();
        }
    }


    $one_minute_ago = date('Y-m-d H:i:s', strtotime('-1 minute'));


    require "../util/sql_auth.php";

    $stmt = $conn->prepare("SELECT submission_time FROM submissions WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->bind_result($submission_time);
    $stmt->fetch();
    $stmt->close();

    if (!isset($submission_time) || $submission_time <= $one_minute_ago) {
        $output = null;
        $retval = null;
        file_put_contents("../tmp/" . $user, $s);
        $isa = "RV32I";
        if (isset($_POST['i'])) {
            if (str_contains(strtoupper($_POST['i']), 'M'))
                $isa .= 'M';
        }
        exec("node verify.js " . $challenge . " \"" . "../tmp/" . $user . "\" " . substr($isa, 4), $output, $retval);
        if ($retval == 0 && count($output) == 5) {
            echo $output[0] . ' ' . $output[1] . ' ' . $output[2] . ' ' . $output[3] . ' ' . $output[4];
            if ($output[0] == $output[1] && $output[2] == $output[3]) {


                $sql = "SELECT score 
                    FROM challenge_scores 
                    WHERE username = '$user' AND challenge = '$challenge' AND isa='$isa'";
                $result = $conn->query($sql);
                if ($result->num_rows === 0 || $output[4] <= ($result->fetch_assoc()['score'])) {
                    $subm_path = '../submissions/' . $isa . '/' . $user . '-' . $challenge . '/';
                    if (!is_dir($subm_path)) {
                        mkdir($subm_path);
                    }
                    $time_str = time();
                    file_put_contents($subm_path . $time_str . '_' . $output[4], $s);
                }

                $sql = "INSERT INTO challenge_scores (username, challenge, score, isa) 
                    VALUES ('$user', '$challenge', $output[4], '$isa')
                    ON DUPLICATE KEY UPDATE
                    score = CASE WHEN VALUES(score) < score THEN VALUES(score) ELSE score END";


                echo $conn->query($sql);
            }
        } else {
            print_r($retval);
            print_r($output);
        }
        $current_time = date('Y-m-d H:i:s');

        $stmt = $conn->prepare("INSERT INTO submissions (username, submission_time) VALUES (?, ?) ON DUPLICATE KEY UPDATE submission_time = VALUES(submission_time)");
        $stmt->bind_param("ss", $user, $current_time);
        $stmt->execute();
        $conn->close();
    } else {
        echo 60 - (strtotime(date('Y-m-d H:i:s')) - strtotime($submission_time));
    }




}
?>