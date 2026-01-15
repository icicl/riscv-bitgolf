<div class="navbar">
    <div class="box-link" style="flex:0" onclick="location.href = 'extensions.php<?php echo isset($_SESSION['isa']) ? '?i=' . strtolower(substr($_SESSION['isa'], 5)) : ''?>'"><div style="border-radius:5px;padding:3px;color:white;background-color:gray;justify-content:center;margin:auto;line-height:normal"><?php echo $_SESSION['isa'] ?? 'RV32I' ?></div></div>
    <div class="vertical-divider"></div>
    <div class="box-link" style="flex:25%" onclick="location.href = 'index.php'">Go to Index of all challenges</div>
    <div class="vertical-divider"></div>
    <?php
    if (isset($_SESSION["username"])) {
        echo '<div class="box-link" onclick="location.href=\'profile.php\'">Signed in as ' . $_SESSION["username"] .
            '</div><div class="vertical-divider"></div><div class="box-link" onclick="location.href = \'change_pwd.php?src=' . urlencode($_SERVER['REQUEST_URI']) . '\'">Change Password</div><div class="vertical-divider"></div>' .
            '<div class="box-link" onclick="logout()">Log out</div>';
    } else {
        echo '<div class="box-link" onclick="location.href = \'login.php?src=' . $_SERVER['REQUEST_URI'] . '\'">Sign in or register</div>';
    } ?>
</div>
<script>
    function logout() { const xmlHttp = new XMLHttpRequest(); xmlHttp.open('GET', 'util/logout.php', false); xmlHttp.send(); location.reload(); }
    const USERNAME = "<?php echo $_SESSION["username"] ?? "" ?>";
</script>