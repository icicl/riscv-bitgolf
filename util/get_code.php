<?php
require "../util/sql_auth.php";

if (!isset($_GET['x']) || !isset($_GET['u'])) {
    die();
}

session_start();
if (isset($_SESSION["username"])) {
    $requesting_user = $conn->real_escape_string($_SESSION['username']);
    $challenge = $conn->real_escape_string($_GET['x']); // assuming challenge is passed as a GET parameter
    $author_user = $conn->real_escape_string($_GET['u']); // assuming challenge is passed as a GET parameter
    $isa = "RV32I";
    if (isset($_GET['i'])) {
        if (str_contains(strtoupper($_GET['i']), 'M'))
            $isa .= 'M';
    }
    $subm_path = '../submissions/' . $isa . '/' . $author_user . '-' . $challenge . '/';
    if (isset($_GET['f'])) {
        $arg_fname = preg_replace("/[^A-Za-z0-9_]/", "", $_GET['f']);
    } else {
        $files = array_filter(scandir($subm_path), function ($file) use ($subm_path) {
            return is_file($subm_path . $file);
        });
        $arg_fname = end($files);
    }

    $sql = "SELECT score 
            FROM challenge_scores 
            WHERE challenge = '$challenge' AND username = '$author_user' AND isa = '$isa'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $author_score = $result->fetch_array()[0];

        $sql = "SELECT score 
                FROM challenge_scores 
                WHERE challenge = '$challenge' AND username = '$requesting_user' AND isa = '$isa'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $requesting_score = $result->fetch_array()[0];
            if ($requesting_score > $author_score) {
                die();
            }
            if (is_dir($subm_path)) {
                if (isset($_GET['f']) && file_exists($subm_path . $arg_fname)) {
                    echo file_get_contents($subm_path . $arg_fname);
                } else {
                    $files = scandir($subm_path, SCANDIR_SORT_DESCENDING);
                    if (sizeof(($files)) > 2) {
                        echo file_get_contents($subm_path . $files[0]);
                    }
                }
            }
        }
    }
}


$conn->close();
?>