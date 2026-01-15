<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RISC-V Bit-Golf ISA</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <?php session_start();
    require("util/navbar.php"); ?>
    <div class="container">
        <div class="column">
            <div class="box">
                <h2>RV32I Instructions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Instruction</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Opcode</th>
                            <th>funct7</th>
                            <th>funct3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- R-type Instructions -->
                        <tr>
                            <td>add rd, rs1, rs2</td>
                            <td>add</td>
                            <td>rd = rs1 + rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>sub rd, rs1, rs2</td>
                            <td>subtract</td>
                            <td>rd = rs1 - rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0100000</td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>sll rd, rs1, rs2</td>
                            <td>shift left logical</td>
                            <td>rd = rs1 << rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>001</td>
                        </tr>
                        <tr>
                            <td>slt rd, rs1, rs2</td>
                            <td>set less than</td>
                            <td>rd = (rs1 < rs2) ? 1 : 0</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>010</td>
                        </tr>
                        <tr>
                            <td>sltu rd, rs1, rs2</td>
                            <td>set less than unsigned</td>
                            <td>rd = (rs1 < rs2) ? 1 : 0</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>011</td>
                        </tr>
                        <tr>
                            <td>xor rd, rs1, rs2</td>
                            <td>exclusive OR</td>
                            <td>rd = rs1 ^ rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>srl rd, rs1, rs2</td>
                            <td>shift right logical</td>
                            <td>rd = rs1 >> rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>101</td>
                        </tr>
                        <tr>
                            <td>sra rd, rs1, rs2</td>
                            <td>shift right arithmetic</td>
                            <td>rd = rs1 >> rs2 (arithmetic)</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0100000</td>
                            <td>101</td>
                        </tr>
                        <tr>
                            <td>or rd, rs1, rs2</td>
                            <td>OR</td>
                            <td>rd = rs1 | rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>110</td>
                        </tr>
                        <tr>
                            <td>and rd, rs1, rs2</td>
                            <td>AND</td>
                            <td>rd = rs1 & rs2</td>
                            <td>R</td>
                            <td>0110011</td>
                            <td>0000000</td>
                            <td>111</td>
                        </tr>

                        <!-- I-type Instructions -->
                        <tr>
                            <td>jalr rd, rs1, imm</td>
                            <td>jump and link register</td>
                            <td>rd = PC + 4; PC = rs1 + imm</td>
                            <td>I</td>
                            <td>1100111</td>
                            <td></td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>lb rd, imm(rs1)</td>
                            <td>load byte</td>
                            <td>rd = sign-extended byte from memory[rs1 + imm]</td>
                            <td>I</td>
                            <td>0000011</td>
                            <td></td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>lh rd, imm(rs1)</td>
                            <td>load halfword</td>
                            <td>rd = sign-extended halfword from memory[rs1 + imm]</td>
                            <td>I</td>
                            <td>0000011</td>
                            <td></td>
                            <td>001</td>
                        </tr>
                        <tr>
                            <td>lw rd, imm(rs1)</td>
                            <td>load word</td>
                            <td>rd = memory[rs1 + imm]</td>
                            <td>I</td>
                            <td>0000011</td>
                            <td></td>
                            <td>010</td>
                        </tr>
                        <tr>
                            <td>lbu rd, imm(rs1)</td>
                            <td>load byte unsigned</td>
                            <td>rd = zero-extended byte from memory[rs1 + imm]</td>
                            <td>I</td>
                            <td>0000011</td>
                            <td></td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>lhu rd, imm(rs1)</td>
                            <td>load halfword unsigned</td>
                            <td>rd = zero-extended halfword from memory[rs1 + imm]</td>
                            <td>I</td>
                            <td>0000011</td>
                            <td></td>
                            <td>101</td>
                        </tr>
                        <tr>
                            <td>addi rd, rs1, imm</td>
                            <td>add immediate</td>
                            <td>rd = rs1 + imm</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td></td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>slti rd, rs1, imm</td>
                            <td>set less than immediate</td>
                            <td>rd = (rs1 < imm) ? 1 : 0</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td></td>
                            <td>010</td>
                        </tr>
                        <tr>
                            <td>sltiu rd, rs1, imm</td>
                            <td>set less than immediate unsigned</td>
                            <td>rd = (rs1 < imm) ? 1 : 0</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td></td>
                            <td>011</td>
                        </tr>
                        <tr>
                            <td>xori rd, rs1, imm</td>
                            <td>XOR immediate</td>
                            <td>rd = rs1 ^ imm</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td></td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>ori rd, rs1, imm</td>
                            <td>OR immediate</td>
                            <td>rd = rs1 | imm</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td></td>
                            <td>110</td>
                        </tr>
                        <tr>
                            <td>andi rd, rs1, imm</td>
                            <td>AND immediate</td>
                            <td>rd = rs1 & imm</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td></td>
                            <td>111</td>
                        </tr>
                        <tr>
                            <td>slli rd, rs1, shamt</td>
                            <td>shift left logical immediate</td>
                            <td>rd = rs1 << shamt</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td>0000000</td>
                            <td>001</td>
                        </tr>
                        <tr>
                            <td>srli rd, rs1, shamt</td>
                            <td>shift right logical immediate</td>
                            <td>rd = rs1 >> shamt</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td>0000000</td>
                            <td>101</td>
                        </tr>
                        <tr>
                            <td>srai rd, rs1, shamt</td>
                            <td>shift right arithmetic immediate</td>
                            <td>rd = rs1 >> shamt (arithmetic)</td>
                            <td>I</td>
                            <td>0010011</td>
                            <td>0100000</td>
                            <td>101</td>
                        </tr>

                        <!-- S-type Instructions -->
                        <tr>
                            <td>sb rs2, imm(rs1)</td>
                            <td>store byte</td>
                            <td>memory[rs1 + imm] = rs2[7:0]</td>
                            <td>S</td>
                            <td>0100011</td>
                            <td></td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>sh rs2, imm(rs1)</td>
                            <td>store halfword</td>
                            <td>memory[rs1 + imm] = rs2[15:0]</td>
                            <td>S</td>
                            <td>0100011</td>
                            <td></td>
                            <td>001</td>
                        </tr>
                        <tr>
                            <td>sw rs2, imm(rs1)</td>
                            <td>store word</td>
                            <td>memory[rs1 + imm] = rs2</td>
                            <td>S</td>
                            <td>0100011</td>
                            <td></td>
                            <td>010</td>
                        </tr>

                        <!-- B-type Instructions -->
                        <tr>
                            <td>beq rs1, rs2, imm</td>
                            <td>branch if equal</td>
                            <td>if (rs1 == rs2) PC += imm</td>
                            <td>B</td>
                            <td>1100011</td>
                            <td></td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>bne rs1, rs2, imm</td>
                            <td>branch if not equal</td>
                            <td>if (rs1 != rs2) PC += imm</td>
                            <td>B</td>
                            <td>1100011</td>
                            <td></td>
                            <td>001</td>
                        </tr>
                        <tr>
                            <td>blt rs1, rs2, imm</td>
                            <td>branch if less than</td>
                            <td>if (rs1 < rs2) PC +=imm</td>
                            <td>B</td>
                            <td>1100011</td>
                            <td></td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>bge rs1, rs2, imm</td>
                            <td>branch if greater than or equal</td>
                            <td>if (rs1 >= rs2) PC += imm</td>
                            <td>B</td>
                            <td>1100011</td>
                            <td></td>
                            <td>101</td>
                        </tr>
                        <tr>
                            <td>bltu rs1, rs2, imm</td>
                            <td>branch if less than unsigned</td>
                            <td>if (rs1 < rs2) PC +=imm</td>
                            <td>B</td>
                            <td>1100011</td>
                            <td></td>
                            <td>110</td>
                        </tr>
                        <tr>
                            <td>bgeu rs1, rs2, imm</td>
                            <td>branch if greater than or equal unsigned</td>
                            <td>if (rs1 >= rs2) PC += imm</td>
                            <td>B</td>
                            <td>1100011</td>
                            <td></td>
                            <td>111</td>
                        </tr>

                        <!-- U-type Instructions -->
                        <tr>
                            <td>lui rd, imm</td>
                            <td>load upper immediate</td>
                            <td>rd = imm << 12</td>
                            <td>U</td>
                            <td>0110111</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>auipc rd, imm</td>
                            <td>add upper immediate to PC</td>
                            <td>rd = PC + (imm << 12)</td>
                            <td>U</td>
                            <td>0010111</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <!-- J-type Instructions -->
                        <tr>
                            <td>jal rd, imm</td>
                            <td>jump and link</td>
                            <td>rd = PC + 4; PC += imm</td>
                            <td>J</td>
                            <td>1101111</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <!-- E-type Instructions -->
                        <tr>
                            <td>input rd</td>
                            <td>accept input</td>
                            <td>rd = input()</td>
                            <td>E</td>
                            <td>1100111</td>
                            <td></td>
                            <td>000</td>
                        </tr>
                        <tr>
                            <td>output rs1</td>
                            <td>output value and halt</td>
                            <td>return rs1</td>
                            <td>E</td>
                            <td>1100111</td>
                            <td></td>
                            <td>001</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="vertical-divider"></div>
        <div class="column">
            <div class="box" style="flex:0 min-content">
                <h2>The Virtual Machine</h2>
                The RISC-V VM has 4KiB of instruction memory, which cannot be accessed, and 1024KiB of little-endian
                data memory, which is mapped from 0x00000000 to 0x000FFFFF.
                The VM has support for all RV32I instructions and pseudoinstructions listed on this page.
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" style="flex:1 0px">
                <h2>The Editor / Assembler</h2>
                <div>
                    The Assembler has the following features:<br><br><br>
                    Single-line comments: use <b>;</b> to begin a single-line comment. Any text after and including the
                    <b>;</b> will be ignored.<br><br>
                    Breakpoints: use a right carat <b>></b> before an instruction to set a breakpoint.<br><br>
                    Labels: use a series of non-whitespace text followed by a colon <b>:</b> to create a label. Labels
                    can be used instead of immediates in jump and branch instructions. Labels cannot start with a
                    number.<br><br>
                    Step: use <b>[ctrl]+,</b> to execute one instruction at a time.<br><br>
                    Run until breakpoint: use <b>[ctrl]+.</b> to execute until the next breakpoint is reached.<br><br>
                    Execute: use <b>[ctrl]+/</b> to run the program until it exits or times out.<br><br>
                    Smart indentation: <b>[tab]</b> and <b>[backspace]</b> will automatically align whitespace to
                    multiples of four characters. The commands <b>[ctrl]+]</b> and <b>[ctrl]+[</b> allow you to indent
                    or dedent multiple lines at once.
                </div>
            </div>
            <div class="horizontal-divider"></div>
            <div class="box" style="flex:0 min-content">
                <h2>RV32I Custom Bit-Golf Pseudoinstructions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Translation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ja label</td>
                            <td>jump absolute</td>
                            <td>jalr x0, x0, &label</td>
                        </tr>
                        <tr>
                            <td>nops</td>
                            <td>no operation surrogate</td>
                            <td>lb x0, 0(x0)</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="horizontal-divider"></div>
            <div class="box" style="flex:1 0px">
                <h2>RV32I Standard Pseudoinstructions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Translation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>li rd, imm</td>
                            <td>load immediate</td>
                            <td>addi rd, x0, imm</td>
                        </tr>
                        <tr>
                            <td>mv rd, rs1</td>
                            <td>move</td>
                            <td>addi rd, rs1, 0</td>
                        </tr>
                        <tr>
                            <td>not rd, rs1</td>
                            <td>bitwise NOT</td>
                            <td>xori rd, rs1, -1</td>
                        </tr>
                        <tr>
                            <td>neg rd, rs1</td>
                            <td>negate</td>
                            <td>sub rd, x0, rs1</td>
                        </tr>
                        <tr>
                            <td>nop</td>
                            <td>no operation</td>
                            <td>addi x0, x0, 0</td>
                        </tr>
                        <tr>
                            <td>beqz rs1, label</td>
                            <td>branch if equal to zero</td>
                            <td>beq rs1, x0, label</td>
                        </tr>
                        <tr>
                            <td>bnez rs1, label</td>
                            <td>branch if not equal to zero</td>
                            <td>bne rs1, x0, label</td>
                        </tr>
                        <tr>
                            <td>bgt rs1, rs2, label</td>
                            <td>branch if greater than</td>
                            <td>blt rs2, rs1, label</td>
                        </tr>
                        <tr>
                            <td>bgtu rs1, rs2, label</td>
                            <td>branch if greater than unsigned</td>
                            <td>bltu rs2, rs1, label</td>
                        </tr>
                        <tr>
                            <td>ble rs1, rs2, label</td>
                            <td>branch if less than or equal</td>
                            <td>bge rs2, rs1, label</td>
                        </tr>
                        <tr>
                            <td>bleu rs1, rs2, label</td>
                            <td>branch if less than or equal unsigned</td>
                            <td>bgeu rs2, rs1, label</td>
                        </tr>
                        <tr>
                            <td>seqz rd, rs1</td>
                            <td>set if equal to zero</td>
                            <td>sltiu rd, rs1, 1</td>
                        </tr>
                        <tr>
                            <td>snez rd, rs1</td>
                            <td>set if not equal to zero</td>
                            <td>sltu rd, x0, rs1</td>
                        </tr>
                        <tr>
                            <td>j label</td>
                            <td>jump</td>
                            <td>jal x0, label</td>
                        </tr>
                        <tr>
                            <td>jr rs1</td>
                            <td>jump register</td>
                            <td>jalr x0, rs1, 0</td>
                        </tr>
                        <tr>
                            <td>ret</td>
                            <td>return from subroutine</td>
                            <td>jalr x0, ra, 0</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</body>

</html>