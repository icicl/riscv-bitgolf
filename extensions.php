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

<?php session_start();
$isa = "RV32I";
if (isset($_GET['i'])) {
    if (str_contains(strtoupper($_GET['i']), 'M'))
        $isa .= 'M';
}
$_SESSION['isa'] = $isa;

require("util/navbar.php");
?>

<div class="container">
    <div class="column">
        <div class="box" style="flex:0 min-content">
            <h2>Choose your ISA extensions</h2>
            <div class="box-link<?php echo $isa == 'RV32I' ? '-active' : ''?>" style="flex:0 0 min-content;flex-direction:row"
                onclick="location.href = 'extensions.php?i='">
                <div style="border-radius:5px;padding:3px;color:white;background-color:gray;justify-content:center;margin:auto;line-height:normal">
                    RV32I</div><div style="flex:1;padding-left:10px;padding-top:2px">The basic instruction set</div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box-link<?php echo $isa == 'RV32IM' ? '-active' : ''?>" style="flex:0 0 min-content;flex-direction:row"
                onclick="location.href = 'extensions.php?i=m'">
                <div style="border-radius:5px;padding:3px;color:white;background-color:gray;justify-content:center;margin:auto;line-height:normal">
                    RV32IM</div><div style="flex:1;padding-left:10px;padding-top:2px">The base instruction set, with the addition of multiplication and division.</div>
            </div>
        </div>
        <div class="horizontal-divider"></div>
        <div class="box" style="flex:1 min-content">
            <h2>What are ISA extensions?</h2>
            RISC-V ISA extensions are optional instruction set modules that add functionality to the base RISC-V
            architecture. They allow customization based on application needs. Each extension is represented by a
            letter:
            <div class="horizontal-divider"></div>
            I – Base integer instructions (required)<br>
            M – Integer multiplication and division<br>
            A – Atomic operations<br>
            F – Single-precision floating-point<br>
            D – Double-precision floating-point<br>
            C – Compressed (16-bit) instructions<br>
            V – Vector operations<br>
            B – Bit manipulation
            <div class="horizontal-divider"></div>
            Currently only extensions I and M are implemented.
        </div>
    </div>
</div>

</body>

</html>