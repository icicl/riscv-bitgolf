<?php
require "../util/sql_auth.php";

if (!isset($_GET['x']) || !isset($_GET['u'])) {
    die();
}

session_start();
if (isset($_SESSION["username"])) {
    $challenge = $conn->real_escape_string($_GET['x']); // assuming challenge is passed as a GET parameter
    $author_user = $conn->real_escape_string($_GET['u']); // assuming challenge is passed as a GET parameter

    $isa = "RV32I";
    if (isset($_GET['i'])) {
        if (str_contains(strtoupper($_GET['i']), 'M')) $isa .= 'M';
    }
    $subm_path = '../submissions/' . $isa . '/' . $author_user . '-' . $challenge . '/';
    if (is_dir($subm_path)) {
        $files = scandir($subm_path, SCANDIR_SORT_DESCENDING);
        echo json_encode($files);
    }
}


$conn->close();
?>